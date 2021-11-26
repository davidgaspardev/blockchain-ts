import { SHA256 } from "crypto-js";
import Block from "./block";
import { getTimestamp, json2hex } from "./utils/format";

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

        const { addBlock, getHeight } = this;

        // Create a genesis block
        const genesisBlock = Block.create({
            hello: "Blockchain"
        });

        addBlock(genesisBlock);
    }

    public async addBlock(block: Block): Promise<Block> {
        // Destructuring assignment
        const { getHeight, chain, version } = this;
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

        return block;
    }

    public getCopyBlock() {
        return Array.from(this.chain);
    }
}