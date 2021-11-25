import Block from "./block";

test("Create a block", () => {
    const block = Block.create({
        index: 3,
        timestamp: new Date(),
        previousHash: "56dbc03f38edc1c457c173cc1812b01395da1f091ea9c1cb26ee60fcfcae5160",
        body: {
            amount: 2500
        }
    });

    expect(block).not.toBeUndefined();
    expect(block).not.toBeNull();

    console.log("A block:", block);
    console.log("A block hash:", block.getHash());
});