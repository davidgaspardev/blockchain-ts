import { SHA256 } from "crypto-js";
import { getTimestamp, hex2ascii, json2hex } from "./utils/format";

/**
 * Block data model
 */
export default class Block {

    /** ===================== Access methods =====================  */

    public static create(data: Object | string): Block {
        if(typeof data == "object") {
            // If data is Object, encoding to hexadecimal
            data = json2hex(data);
        }
        return new Block(data as string);
    }

    /** ===================== Properties =====================  */

    // Version
    private _version?: number;
    set version(version: number) {
        this._version ??= version;
    }
    get version(): number {
        return this._version || 0;
    }

    // Height
    private _height?: number;
    set height(height: number) {
        this._height ??= height;
    }
    get height(): number {
        return this._height || 0;
    }

    // Timestamp
    private _timestamp?: number;
    set timestamp(timestamp: number | Date) {
        if(typeof timestamp == "object") {
            timestamp = getTimestamp(timestamp);
        }
        this._timestamp ??= timestamp;
    }
    get timestamp(): number {
        return this._timestamp || 0;
    }

    private _owner?: string;
    set owner(owner: string) {
        this._owner ??= owner;
    }
    get owner(): string {
        return this._owner || "";
    }

    // Hash
    private _hash?: string;
    set hash(hash: string) {
        this._hash ??= hash;
    }
    get hash(): string {
        return this._hash || "";
    }

    // Previous hash
    private _previousHash?: string;
    set previousHash(hash: string) {
        this._previousHash ??= hash;
    }
    get previousHash(): string {
        return this._previousHash || "";
    }

    private readonly body: string;

    /** ===================== Constructor =====================  */

    /**
     * Build a block
     * 
     * @param {body} body hex
     */
    private constructor(body: string) {
        this.body = body;

        this.getRawData = this.getRawData.bind(this);
        this.hasPreviousHash = this.hasPreviousHash.bind(this);
        this.isGenesis = this.isGenesis.bind(this);
    }

    /** ===================== Methods =====================  */

    public getRawData(): string {
        const { version, height, timestamp, previousHash, body, hasPreviousHash, isGenesis } = this;

        if(!hasPreviousHash() && !isGenesis()) {
            throw Error("This block is invalid");
        }

        return version.toString()
            + height.toString()
            + timestamp.toString()
            + (isGenesis() ? "" : previousHash)
            + body;
    }

    private isGenesis(): boolean {
        // Descruturing assignment 
        const { height } = this;

        return height == 0;
    }

    private hasPreviousHash(): boolean {
        // Descruturing assignment 
        const { _previousHash } = this;

        return _previousHash !== undefined;
    }

    /**
     *  validate() method will validate if the block has been tampered or not.
     *  Been tampered means that someone from outside the application tried to change
     *  values in the block data as a consecuence the hash of the block should be different.
     */
    public async validate(): Promise<boolean> {
        // Destructuring assignment
        const { hash, getRawData } = this;

        this._hash = undefined;
        this.hash = SHA256(getRawData()).toString();

        return this.hash === hash;
    }

    public getBData(): Object {
        const { body, height } = this;

        if(height < 1) throw Error(`Cannot read genesis block (height: ${height})`); 

        return JSON.parse(hex2ascii(body));
    }
}