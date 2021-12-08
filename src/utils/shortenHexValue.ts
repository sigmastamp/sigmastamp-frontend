import { string_hex } from '../interfaces/stringTypes';

export function shortenHexValue(value: string_hex, length: number): string {
    const { zeros, rest } = /(?<zeros>0*)(?<rest>[0-9a-f]*)/i.exec(value)!
        .groups!;

    if (zeros.length === 0) {
        return rest.substr(0, length - 3) + '…' + rest.substr(-2);
    } else {
        return '0…' + rest.substr(0, length - 5) + '…' + rest.substr(-2);
    }
}
