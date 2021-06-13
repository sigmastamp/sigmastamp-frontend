import { IOracle } from "./IOracle";

export abstract class AbstractBlockcyptherOracle implements IOracle {

    protected abstract coinBlockcypther: string;

    async current() {

        const response = await fetch(`https://api.blockcypher.com/v1/${this.coinBlockcypther}/main`/*`https://blockchain.info/latestblock`*/,
            /*{ mode: 'no-cors' }*/);
        console.log({ response });
        const currentBlock = await response.json();

        return currentBlock.hash;
    }
}