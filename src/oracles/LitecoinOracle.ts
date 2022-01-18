import { AbstractBlockcyptherOracle } from './_AbstractBlockcyptherOracle';

export class LitecoinOracle extends AbstractBlockcyptherOracle {
    public name = 'LTC';
    protected titleOfCoin = 'Litecoin';
    protected ttl = 60 * 2.5;
}
