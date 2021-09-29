import { string_hex } from "../interfaces/stringTypes";


export function convertToHex(str: string): string_hex {
    let hex = '';
    for (let i = 0; i < str.length; i++) {
        hex += '' + str.charCodeAt(i).toString(16);
    }
    return hex;
}
