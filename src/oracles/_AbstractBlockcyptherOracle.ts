import { IOracle } from './_IOracle';

export abstract class AbstractBlockcyptherOracle implements IOracle {
    public abstract name: string;
    public abstract title: string;

    // TODO: !!! Remove dataTitles globally
    public dataTitles = { hash: 'Current block hash' };
    public ttl = -1;

    public async getData() {
        const apiUrl = new URL(
            `https://api.blockcypher.com/v1/${this.name.toLowerCase()}/main`,
        );

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
                title: 'Current block hash',
                format: 'SHA256 Hash',
                value: hash,
                source: new URL(
                    `https://live.blockcypher.com/btc/block/000000000000000000059d1fe00282a7272ac4d421614be9bae31e35ac5ae3ce/`,
                    // `https://www.blockchain.com/${this.name.toLowerCase()}/block/${hash}`,
                ),
                getCompactValue(length: number) {
                    return hash.substr(0, length /* TODO: !!! Better */);
                },
            },
        ];
    }
}
