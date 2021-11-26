import { getTimestamp, hex2ascii, json2hex, string2hex } from "./format";

describe("Formating data", () => {

    test("Not timestamp", () => {
        const timestamp = getTimestamp();

        expect(typeof timestamp).toBe("number");
        expect(`${timestamp}`.length).toEqual(10);
    });

    test("Timestamp to 1999/02/16", () => {
        const date = new Date(1999, 2, 16);
        const timestamp = 921553200;

        expect(getTimestamp(date)).toEqual(timestamp);
    });

    test("Encode plain text to hexadeciaml", () => {
        const name = "David Gaspar";
        // xxd -p <<< "David Gaspar" 
        const nameHex = "446176696420476173706172" /** (without last byte: 0a) */

        expect(string2hex(name)).toEqual(nameHex);
    });

    test("Encode JSON as plain text to hexadecimal", () => {
        const nameJson = {
            name: "David Gaspar"
        };
        const nameJsonHex = "7b226e616d65223a22446176696420476173706172227d";

        expect(json2hex(nameJson)).toEqual(nameJsonHex);
    });

    test("Decode hexadicmal to plain text (ASCII)", () => {
        const nameHex = "446176696420476173706172";
        const name = "David Gaspar";

        expect(hex2ascii(nameHex)).toEqual(name);
    });
});