import { IOracle } from "./IOracle";

export class BitcoinOracle implements IOracle {


    async current() {

        const response = await fetch(`https://api.blockcypher.com/v1/eth/main`/*`https://blockchain.info/latestblock`*/,
            /*{ mode: 'no-cors' }*/);
        console.log({ response });
        const currentBlock = await response.json();

        return currentBlock.hash;
    }
}