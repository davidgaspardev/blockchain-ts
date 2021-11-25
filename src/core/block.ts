import { SHA256 } from "crypto-js";

type BlockProps = {
    index: number;
    timestamp: Date;
    previousHash: string;
    body: Object;
};

/**
 * Block data model
 */
export default class Block {

    public static create(props: BlockProps): Block {
        const { index, timestamp, previousHash, body } = props;
        return new Block(index, timestamp, previousHash, body);
    }

    // Properties
    private readonly index: number;
    private readonly timestamp: Date;
    private readonly previousHash: string;
    private readonly body: Object;

    /**
     * Build a block
     * 
     * @param {number} index 
     * @param {Date} timestamp 
     * @param {string} previousHash 
     * @param {Object} body 
     */
    private constructor(index: number, timestamp: Date, previousHash: string, body: Object) {
        this.index = index;
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.body = body;

        this.loadAllData = this.loadAllData.bind(this);
    }

    private loadAllData(): string {
        const { index, timestamp, previousHash, body } = this;

        return index.toString() 
            + timestamp.toString()
            + previousHash
            + JSON.stringify(body);
    }

    public getHash(): string {
        const { loadAllData } = this;
        const data = loadAllData();

        return SHA256(data).toString();
    }
}