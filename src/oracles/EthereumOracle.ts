import { AbstractBlockcyptherOracle } from "./AbstractBlockcyptherOracle";
import { IOracle } from "./IOracle";

export class BitcoinOracle extends AbstractBlockcyptherOracle implements IOracle {
    protected coinBlockcypther = 'eth';
}