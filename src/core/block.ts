import { SHA256 } from "crypto-js";

export type BlockProps = {
    version: number;
    height: number;
    timestamp: number;
    body: Object;
};

/**
 * Block data model
 */
export default class Block {

    public static create(props: BlockProps): Block {
        const { version, height, timestamp, body } = props;

        return new Block(version, height, timestamp, body);
    }

    // Properties
    public readonly version: number;
    public readonly height: number;
    public readonly timestamp: number;
    private readonly body: Object;

    /**
     * Build a block
     * 
     * @param {number} version
     * @param {number} height
     * @param {number} timestamp
     * @param {Object} body 
     */
    private constructor(
        version: number, 
        height: number,
        timestamp: number,
        body: Object
    ) {
        this.version = version;
        this.height = height;
        this.timestamp = timestamp;
        this.body = body;

        this.getRawData = this.getRawData.bind(this);
        this.hasPreviousHash = this.hasPreviousHash.bind(this);
        this.isGenesis = this.isGenesis.bind(this);
    }

    public getRawData(): string {
        const { version, height, timestamp, previousHash, body, hasPreviousHash, isGenesis } = this;

        if(!hasPreviousHash() && !isGenesis()) {
            throw Error("This block is invalid");
        } 

        return version.toString()
            + height.toString()
            + timestamp.toString()
            + (isGenesis() ? "" : previousHash)
            + JSON.stringify(body);
    }

    private isGenesis(): boolean {
        return this.height == 0;
    }

    private hasPreviousHash(): boolean {
        return this.previousHash !== undefined;
    }

    // Security hash

    private hash: string | undefined;
    public setHash(hash: string) {
        if(!this.hash) this.hash = hash;
    }
    public getHash(): string {
        return this.hash || "";
    }

    private previousHash: string | undefined;
    public setPreviousHash(hash: string) {
        if(!this.previousHash) this.previousHash = hash;
    }
    public getPreviousHash(): string {
        return this.previousHash || "";
    }

    /**
     *  validate() method will validate if the block has been tampered or not.
     *  Been tampered means that someone from outside the application tried to change
     *  values in the block data as a consecuence the hash of the block should be different.
     */
    public async validate(): Promise<boolean> {
        // Destructuring assignment
        const { hash, getRawData } = this;

        this.hash = SHA256(getRawData()).toString();

        return this.hash === hash;
    }
}