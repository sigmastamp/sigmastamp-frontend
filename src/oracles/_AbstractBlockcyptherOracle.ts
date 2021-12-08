import { string_hex } from '../interfaces/stringTypes';
import { IOracle } from './_IOracle';

export abstract class AbstractBlockcyptherOracle
    implements IOracle<{ hash: string_hex }>
{
    public abstract name: string;
    public abstract title: string;

    public dataTitles = { hash: 'Current block hash' };
    public ttl = -1;

    public async getData() {
        try {
            const response = await fetch(
                `https://api.blockcypher.com/v1/${this.name.toLowerCase()}/main` /*`https://blockchain.info/latestblock`*/,
                /*{ mode: 'no-cors' }*/
            );
            // console.log({ response });
            const body = await response.json();

            if (body.error) {
                throw new Error(body.error);
            }

            const { hash } = body;
            return { hash };
        } catch (error) {
            // TODO: !!! How to handle problems with external providers?
            console.error(error);
            return { hash: null };
        }
    }
}
