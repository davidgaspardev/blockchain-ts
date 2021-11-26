import Block from "./block";
import Blockchain from "./blockchain";
import { getTimestamp } from "./utils/format";

describe("Tests in blockchain", () => {

    var blockchain: Blockchain;

    test("Initilize blockchain", () => {
        blockchain = Blockchain.init();

        expect(blockchain).not.toBeUndefined();
        expect(blockchain).not.toBeNull();
    });

    const newBlockNumber = 8;
    test(`Create ${newBlockNumber} blocks`, () => {
        for(let i = 1; i <= newBlockNumber; i++) {
            blockchain.addBlock(Block.create({
                version: 1,
                timestamp: getTimestamp(),
                height: i,
                body: {
                    amount: i * 2500
                }
            }));
        }

        expect(blockchain!.getCopyBlock().length).toEqual(newBlockNumber + /** genesis */ 1);

        console.log("Blockchain:", blockchain);
    });
});