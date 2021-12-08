import { shortenHexValue } from '../utils/shortenHexValue';
import { IOracle } from './_IOracle';

export abstract class AbstractBlockcyptherOracle implements IOracle {
    public abstract name: string;
    protected abstract titleOfCoin: string;

    public ttl = -1;

    public async getData() {
        const apiUrl = new URL(
            `https://api.blockcypher.com/v1/${this.name.toLowerCase()}/main`,
            // TODO: !!! Wouldn't there be a problem with limits;= is referrer in the request?
        );

        try {
            const response = await fetch(
                apiUrl.href,
                /*`https://blockchain.info/latestblock`*/
                /*{ mode: 'no-cors' }*/
            );
            // console.log({ response });
            const body = await response.json();

            if (body.error) {
                throw new Error(body.error);
            }

            const { hash } = body;
            return [
                {
                    title: `${this.titleOfCoin} current block`,
                    format: 'SHA256 Hash',
                    value: hash,
                    source: new URL(
                        `https://live.blockcypher.com/${this.name.toLowerCase()}/block/${hash}`,
                        // `https://www.blockchain.com/${this.name.toLowerCase()}/block/${hash}`,
                    ),
                    getCompactValue(length: number) {
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
