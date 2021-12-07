import { readFileAsArrayBuffer } from './readFileAsArrayBuffer';

export async function readFileAsByteArray(file: File | Blob): Promise<Uint8Array> {
    return new Uint8Array(await readFileAsArrayBuffer(file));
}
