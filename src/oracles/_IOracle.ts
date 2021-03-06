import { Promisable } from 'type-fest';

export interface IOracle {
    /**
     * Unique identifier of the Oracle
     * @example "BTC"
     */
    name: string;

    /**
     * Gets current state of oracles domain
     * ⚠️ Warning: Getting the data can fail (it is typically request to external sources) so it is recommended to handle errors
     */
    getData(): Promisable<IOracleData[]>;
}

export interface IOracleData {
    /**
     * Title for web and certificate
     * @example "Current block hash"
     */
    title: string;

    /**
     * The value
     * @example "000000000000000000059d1fe00282a7272ac4d421614be9bae31e35ac5ae3ce"
     */
    value: string;

    /**
     * Format of the data value
     * @example "SHA256 Hash"
     */
    format?: string;

    /**
     * Link to the data sources
     *
     * @example "https://www.blockchain.com/btc/block/000000000000000000059d1fe00282a7272ac4d421614be9bae31e35ac5ae3ce"
     */
    source?: URL;

    /**
     * The value compacted to given length
     *
     * @example "00…ae3ce"
     */
    getShortenValue?: (length: number) => string;
}

/**
 * TODO: @hejny Maybe in source> You can provide multiple links to different sources to gain redundancy
 * TODO: @hejny Automatical tests that source URL is working and returns valid data
 */
