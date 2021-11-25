import { loadMessage } from ".";

test("Load message", () => {
    const msg = loadMessage();

    expect(msg).toEqual("Hello, Blockchain!");
});
