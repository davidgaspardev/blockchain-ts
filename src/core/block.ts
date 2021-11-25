import { SHA256 } from "crypto-js";

export type BlockProps = {
    version: number;
    height: number;
    timestamp: Date;
    previousHash?: string;
    body: Object;
};

/**
 * Block data model
 */
export default class Block {

    public static create(props: BlockProps): Block {
        const { version, height, timestamp, previousHash, body } = props;

        if(!previousHash && height !== 0)
            // It's not genesis block
            throw Error("The block must have the previous hash");

        return new Block(version, height, timestamp, previousHash, body);
    }

    // Properties
    private readonly version: number;
    private readonly height: number;
    private readonly timestamp: Date;
    private readonly previousHash: string;
    private readonly body: Object;

    /**
     * Build a block
     * 
     * @param {number} version
     * @param {number} height
     * @param {Date} timestamp 
     * @param {string} previousHash 
     * @param {Object} body 
     */
    private constructor(
        version: number, 
        height: number,
        timestamp: Date,
        previousHash: string = "",
        body: Object
    ) {
        this.version = version;
        this.height = height;
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.body = body;

        this.loadAllData = this.loadAllData.bind(this);
    }

    private loadAllData(): string {
        const { version, height, timestamp, previousHash, body } = this;

        return version.toString()
            + height.toString()
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