import { readFile } from './readFile';

export async function getAsByteArray(file: File|Blob): Promise<Uint8Array> {
  return new Uint8Array(await readFile(file));
}
