import Block from "./block";
import Blockchain from "./blockchain";
import { getTimestamp, json2hex } from "./utils/format";

describe("Tests in blockchain", () => {

    var blockchain: Blockchain;

    test("Initilize blockchain", () => {
        blockchain = Blockchain.init();

        expect(blockchain).not.toBeUndefined();
        expect(blockchain).not.toBeNull();
    });

    const newBlockNumber = 8;
    test(`Create ${newBlockNumber} new blocks`, () => {
        for(let i = 1; i <= newBlockNumber; i++) {
            blockchain.addBlock(Block.create({
                version: 1,
                timestamp: getTimestamp(),
                height: i,
                body: json2hex({
                    amount: i * 2500
                })
            }));
        }

        expect(blockchain!.getCopyBlock().length).toEqual(newBlockNumber + /** genesis */ 1);
    });

    test("Validate all blocks", async () => {
        const blocks = blockchain!.getCopyBlock();

        for(let i = 0; i < blocks.length; i++) {
            expect(await blocks[i].validate()).toEqual(true);
        }
    });

    test("Read body of all blocks", () => {
        const blocks = blockchain!.getCopyBlock();

        for(let i = 0; i < blocks.length; i++) {
            if(i == 0) {
                // Genesis block cannot get body
                expect(() => {
                    blocks[i].getBData();
                }).toThrow(Error(`Cannot read genesis block (height: ${i})`))
            } else {
                const body = blocks[i].getBData();
                expect(typeof body).toEqual("object");
            }
        }
    });
});