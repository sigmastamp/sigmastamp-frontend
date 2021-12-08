// @ts-ignore: no typings
import { blake2bFinal, blake2bInit, blake2bUpdate } from 'blakejs';
import { string_hex } from '../interfaces/stringTypes';
import { readFileAsByteArray } from '../utils/readFileAsByteArray';
import { uint8ArrayToHex } from '../utils/uint8ArrayToHex';

export async function blake2b256(input: File | Blob): Promise<string_hex> {
    const KEY = null; // optional key
    const OUTPUT_LENGTH = 32; // bytes
    const context = blake2bInit(OUTPUT_LENGTH, KEY || undefined);

    // each time you get a byte array from the stream:
    blake2bUpdate(context, await readFileAsByteArray(input));

    // finally, once the stream has been exhausted
    const hashUint8Array = blake2bFinal(context);
    // returns a 64-byte hash, as a Uint8Array

    const hash = uint8ArrayToHex(hashUint8Array);

    return hash;
}
