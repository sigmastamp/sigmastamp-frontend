import { AbstractBlockcyptherOracle } from './_AbstractBlockcyptherOracle';

export class LitecoinOracle extends AbstractBlockcyptherOracle {
    public name = 'LTC';
    protected titleOfCoin = 'Litecoin';
    protected ttl = 10 /* TODO: !!! Real duration of block */;
}
