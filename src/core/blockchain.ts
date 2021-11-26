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

    private readonly chains: Block[] = [];

    private getHeight(): number {
        return this.chains.length;
    }

    private constructor() {
        this.addBlock = this.addBlock.bind(this);
        this.getHeight = this.getHeight.bind(this);

        const { addBlock, getHeight } = this;

        // Create a genesis block
        const genesisBlock = Block.create({
            version: 1,
            height: getHeight(),
            timestamp: getTimestamp(),
            body: json2hex({
                hello: "Blockchain"
            })
        });

        addBlock(genesisBlock);
    }

    public addBlock(block: Block) {
        const { getHeight, chains } = this;
        const height = getHeight();
        // Check block height
        if(block.height !== height) {
            throw Error("Height invalid");
        }
        // Get the blockchain height to check the previous hash 
        // is mandatory.
        if(height > 0) {
            const previousHash = chains[height - 1].getHash();
            block.setPreviousHash(previousHash);
        }
        // Generate hash to this block
        const hash = SHA256(block.getRawData()).toString();
        block.setHash(hash);
        // Link in chains
        this.chains.push(block);
    }

    public getCopyBlock() {
        return Array.from(this.chains);
    }
}