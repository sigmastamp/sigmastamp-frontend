export function uint8ArrayToHex(uint8Array: Uint8Array) {
    return [...uint8Array].map((x) => x.toString(16).padStart(2, '0')).join('');
}
