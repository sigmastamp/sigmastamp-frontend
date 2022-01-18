import { AbstractBlockcyptherOracle } from './_AbstractBlockcyptherOracle';

export class EthereumOracle extends AbstractBlockcyptherOracle {
    public name = 'ETH';
    protected titleOfCoin = 'Ethereum';
    protected ttl = 12;
}
