import { blake2b256 } from '../hash/blake2b256';
import { shortenHexValue } from '../utils/shortenHexValue';
import { IOracle } from './_IOracle';

export class FakeFileOracle implements IOracle {
    public readonly name = `FILE${
        this.file.name.toUpperCase() /* TODO: @hejny Normalize to uppercase */
    }`;
    public readonly ttl = -1;

    constructor(private readonly file: File) {}

    async getData() {
        const hash = await blake2b256(this.file);

        return [
            {
                title: this.file.name,
                format: 'Blake2b256 hash',
                value: hash,
                getShortenValue(length: number) {
                    return shortenHexValue(hash, length);
                },
            },
        ];
    }
}
