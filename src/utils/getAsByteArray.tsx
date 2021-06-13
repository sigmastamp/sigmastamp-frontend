import { readFile } from './readFile';

export async function getAsByteArray(file: File): Promise<Uint8Array> {
  return new Uint8Array(await readFile(file));
}
