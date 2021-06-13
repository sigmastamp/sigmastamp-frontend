export function hexToBase64(str: string) {
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
