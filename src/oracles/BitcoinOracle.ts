import { AbstractBlockcyptherOracle } from './_AbstractBlockcyptherOracle';

export class BitcoinOracle extends AbstractBlockcyptherOracle {
    public name = 'BTC';
    protected titleOfCoin = 'Bitcoin';
    protected ttl = 600;
}
