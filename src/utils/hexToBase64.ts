import { string_base64, string_hex } from '../interfaces/stringTypes';

export function hexToBase64(str: string_hex): string_base64 {
    return btoa(
        String.fromCharCode.apply(
            null,
            // @ts-ignore:
            str
                .replace(/\r|\n/g, '')
                .replace(/([\da-fA-F]{2}) ?/g, '0x$1 ')
                .replace(/ +$/, '')
                .split(' '),
        ),
    );
}
