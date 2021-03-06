import { fetchWithCache } from '../utils/fetchWithCache';
import { shortenHexValue } from '../utils/shortenHexValue';
import { IOracle } from './_IOracle';

export abstract class AbstractBlockcyptherOracle implements IOracle {
    public abstract name: string;
    protected abstract titleOfCoin: string;

    /**
     * Time to live in seconds. When -1 provided, data will be valid until page is reloaded.
     */
    protected abstract ttl: number;

    public async getData() {
        const apiUrl = new URL(
            `https://api.blockcypher.com/v1/${this.name.toLowerCase()}/main`,
        );

        try {
            const { hash } = await fetchWithCache(
                /*`https://blockchain.info/latestblock`*/
                /*{ mode: 'no-cors' }*/
                apiUrl,
                this.ttl,
            );

            return [
                {
                    title: `${this.titleOfCoin}\ncurrent block`,
                    format: 'SHA256 Hash',
                    value: hash,
                    source: new URL(
                        `https://live.blockcypher.com/${this.name.toLowerCase()}/block/${hash}`,
                        // `https://www.blockchain.com/${this.name.toLowerCase()}/block/${hash}`,
                    ),
                    getShortenValue(length: number) {
                        return shortenHexValue(hash, length);
                    },
                },
            ];
        } catch (error) {
            if (error instanceof Error && error.message === 'Failed to fetch') {
                throw new Error(`Failed to fetch ${apiUrl.href}`);
            } else {
                throw error;
            }
        }
    }
}

/**
 * TODO: !!! @hejny There is problem with API call limits to api.blockcypher.com
 */
