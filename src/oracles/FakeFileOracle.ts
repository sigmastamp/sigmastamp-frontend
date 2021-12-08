import { blake2b256 } from '../hash/blake2b256';
import { string_hex } from '../interfaces/stringTypes';
import { IOracle } from './_IOracle';

interface IFakeFileOracleData {
    hash: string_hex;
}

export class FakeFileOracle implements IOracle<IFakeFileOracleData> {
    public readonly name = `FILE${
        this.file.name.toUpperCase() /* TODO: Normalize to uppercase */
    }`;
    public readonly title = `File ${this.file.name}`;
    public readonly ttl = -1;
    public readonly dataTitles = {
        hash: 'Blake2b256 Hash of',
    };

    constructor(private readonly file: File) {}

    async getData(): Promise<IFakeFileOracleData> {
        return { hash: await blake2b256(this.file) };
    }
}
