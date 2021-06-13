
// @ts-ignore: no typings
import { blake2bInit, blake2bUpdate, blake2bFinal } from 'blakejs';
import { getAsByteArray } from '../utils/getAsByteArray';
import { uint8ArrayToHex } from '../utils/uint8ArrayToHex';


export async function blake2b256(input: File): Promise<string> {

    const KEY = null // optional key
    const OUTPUT_LENGTH = 32 // bytes
    const context = blake2bInit(OUTPUT_LENGTH, KEY)

    // each time you get a byte array from the stream:
    blake2bUpdate(context, await getAsByteArray(input));

    // finally, once the stream has been exhausted
    const hashUint8Array = blake2bFinal(context)
    // returns a 64-byte hash, as a Uint8Array

    const hash = uint8ArrayToHex(hashUint8Array);

    return hash;

}