import { string_hex } from '../interfaces/stringTypes';

export function convertFromHex(hex: string_hex): string {
    let str = '';
    for (let i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}
