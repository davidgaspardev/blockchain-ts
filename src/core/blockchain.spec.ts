import Block from "./block";
import Blockchain from "./blockchain";

describe("Tests in blockchain", () => {

    var blockchain: Blockchain;

    test("Initilize blockchain", () => {
        blockchain = Blockchain.init();

        expect(blockchain).not.toBeUndefined();
        expect(blockchain).not.toBeNull();

        console.log("Blockchain:", blockchain);
    });

    const newBlockNumber = 8;
    test(`Create ${newBlockNumber} blocks`, () => {
        for(let i = 1; i <= newBlockNumber; i++) {
            blockchain.addBlock(Block.create({
                version: 1,
                timestamp: new Date(),
                height: i,
                body: {
                    amount: i * 2500
                }
            }));
        }

        expect(blockchain!.getCopyBlock().length).toEqual(newBlockNumber + /** genesis */ 1);
    });
});