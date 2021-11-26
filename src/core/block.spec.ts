import Block from "./block";
import { getTimestamp } from "./utils/format";

describe("Block tests", () => {
    let block: Block;

    test("Create a block", () => {
        block = Block.create({
            version: 1,
            height: 3,
            timestamp: getTimestamp(),
            body: {
                amount: 2500
            }
        });
    
        expect(block).not.toBeUndefined();
        expect(block).not.toBeNull();    
    });
    
    test("Setter hashs (SHA256)", () => {
        // Dummy hashes
        const hash = "92fac3bd7c7be7a654d45de39d3f9da0bc3aa7f64c904252ef439436f3c4c2a0";
        const previousHash = "b662f16d7a12165ba1f6e0004a415d93ef74c8eebf0ad6ab7c10ed495d54001d";

        block.setHash(hash);
        block.setPreviousHash(previousHash);

        expect(block.getHash()).toEqual(hash);
        expect(block.getPreviousHash()).toEqual(previousHash);
    });
});