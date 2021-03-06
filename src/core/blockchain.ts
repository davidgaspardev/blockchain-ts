import { SHA256 } from "crypto-js";
import Block from "./block";
import { getTimestamp } from "./utils/format";
import bitcoinMessage from "bitcoinjs-message";

export default class Blockchain {

    private static instance: Blockchain;

    public static init(): Blockchain {
        if(!this.instance) {
            this.instance = new Blockchain();
        }
        return this.instance;
    }

    private readonly version: number = 1;
    private readonly chain: Block[] = [];

    private getHeight(): number {
        return this.chain.length;
    }

    private constructor() {
        this.addBlock = this.addBlock.bind(this);
        this.getHeight = this.getHeight.bind(this);
        this.validateChain = this.validateChain.bind(this);

        const { addBlock } = this;

        // Create a genesis block
        const genesisBlock = Block.create({
            hello: "Blockchain"
        });

        addBlock(genesisBlock);
    }

    public async addBlock(block: Block): Promise<Block> {
        // Destructuring assignment
        const { getHeight, validateChain, chain, version } = this;
        const height = getHeight();
        // Signing block
        block.version = version;
        block.height = height;
        block.timestamp = getTimestamp();
        // Get the blockchain height to check the previous hash 
        // is mandatory.
        if(height > 0) {
            const previousBlock = chain[height - 1];
            const previousHash = previousBlock.hash;
            block.previousHash = previousHash;
        }
        // Generate hash to this block
        const hash = SHA256(block.getRawData()).toString();
        block.hash = hash;
        // Push the block into the chain
        this.chain.push(block);

        // Show errors (logs)
        validateChain().then(error => console.log("error:", error));
        return block;
    }

    public getCopyBlock() {
        return Array.from(this.chain);
    }

    /**
     * The requestMessageOwnershipVerification(address) method
     * will allow you  to request a message that you will use to
     * sign it with your Bitcoin Wallet (Electrum or Bitcoin Core)
     * This is the first step before submit your Block.
     */
    public async requestMessageOwnershipVerification(address: string): Promise<string> {
        const unsignedMessage = `${address}:${getTimestamp()}:starRegistry`;
        return unsignedMessage;
    }

    /**
     * The submitStar(address, message, signature, star) method
     * will allow users to register a new Block with the star object
     * into the chain.
     */
    public async submitStar(address: string, message: string, signature: string, star: Object): Promise<Block> {
        // Destruturing assignment
        const { addBlock } = this;

        // Check timeout (5min)
        const requestTimestamp = parseInt(message.split(':')[1]);
        const spendTimestamp = getTimestamp() - requestTimestamp;
        if(spendTimestamp >= (5 * 60)) throw Error("Timeout");

        if(!bitcoinMessage.verify(message, address, signature)) {
            throw Error("Invalid message");
        }

        // Add block
        const block = Block.create({ star });
        block.owner = address;
        return await addBlock(block);
    }

    /**
     * This method will return a Promise that will resolve with the Block
     *  with the hash passed as a parameter.
     * Search on the chain array for the block that has the hash.
     */
    public async getBlockByHash(hash: string): Promise<Block> {
        // Destruturing assignment
        const { chain } = this;

        return chain.filter((block) => block.hash === hash)[0];
    }

    /**
     * This method will return a Promise that will resolve with the Block object 
     * with the height equal to the parameter `height`.
     */
    public async getBlockByHeight(height: number): Promise<Block> {
        // Destrutuging assignment
        const { chain } = this;

        return chain[height];
    }

    /**
     * This method will return a Promise that will resolve with an array of Stars objects existing in the chain 
     * and are belongs to the owner with the wallet address passed as parameter.
     * Remember the star should be returned decoded.
     */
    public async getStarsByWalletAddress(address: string): Promise<Array<Object>> {
        // Destructuring assignment
        const { chain } = this;

        const stars = chain.filter(
            (block) => block.owner === address
        ).map(
            (block) => block.getBData()
        );

        if(stars.length === 0) {
            throw Error("Address not found");
        }

        return stars;
    }

    public async validateChain(): Promise<Array<Error>> {
        // Destructuring assignment
        const { chain } = this;

        let errors: Error[] = []; 
        for(let i = (chain.length - 1); i > 0; i--) {
            const currentBlock = chain[i];
            const previousBlock = chain[i - 1];

            if(currentBlock.previousHash !== previousBlock.hash) {
                errors.push(new Error(`Invalid link: Block #${currentBlock.height} -> block #${previousBlock.height}.`));
            }

            if(!(await currentBlock.validate())) {
                errors.push(new Error(`Invalid block #${currentBlock.height}: ${currentBlock.hash}`));
            }
        }

        return errors;
    }
}