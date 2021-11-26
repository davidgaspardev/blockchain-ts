import Block from "./block";
import { getTimestamp, json2hex } from "./utils/format";

describe("Block tests", () => {
    let block: Block;

    test("Create a block", () => {
        block = Block.create(json2hex({
            amount: 1897
        }));
    
        expect(block).not.toBeUndefined();
        expect(block).not.toBeNull();    
    });
    
    test("Setter hashs (SHA256)", () => {
        // Dummy hashes
        const hash = "92fac3bd7c7be7a654d45de39d3f9da0bc3aa7f64c904252ef439436f3c4c2a0";
        const previousHash = "b662f16d7a12165ba1f6e0004a415d93ef74c8eebf0ad6ab7c10ed495d54001d";

        block.hash = hash;
        block.previousHash = previousHash;

        expect(block.hash).toEqual(hash);
        expect(block.previousHash).toEqual(previousHash);
    });

    test("Block validation", async () => {
        // This block is not valid, because was setted dummy hashes.
        expect(await block.validate()).toEqual(false);
    });
});