import { ConfigChecker } from 'configchecker';
///* tslint:disable:no-var-requires */
//const packageJson = require('../package.json');
import { version } from '../package.json';
import { BitcoinOracle } from './oracles/BitcoinOracle';
import { DateOracle } from './oracles/DateOracle';
import { EthereumOracle } from './oracles/EthereumOracle';
import { LitecoinOracle } from './oracles/LitecoinOracle';
import { NytimesOracle } from './oracles/NytimesOracle';

export const VERSION = version;

export enum ROUTES {
    FirstCertificate = '/',
    SecondCertificate = '/verify',
    Oracles = '/oracles',
    About = '/about',
}

export const ORACLES = [
    new BitcoinOracle(),
    new EthereumOracle(),
    new LitecoinOracle(),
    new DateOracle(),
    new NytimesOracle(),
];

const config = ConfigChecker.from(process.env);

// TODO @hejny - see comments bellow
// TODO - add testnet/mainnet switch
// TODO - add config for ergo explorer url and subdomains for testnet/mainnet variant

export const ERGO_ASSEMBLER_URL = config
    .get(
        'REACT_APP_ERGO_ASSEMBLER_URL' /* TODO: configchecker can ignore prefxes in ConfigChecker.from */,
    )
    .url()
    // TODO: .checkHttps()
    // TODO: .checkNativePort()
    // TODO: universal .check() in configchecker
    .required().value!;

export const BUILD_DETAILS_URL = config
    .get(
        'REACT_APP_BUILD_DETAILS_URL' /* TODO: configchecker can ignore prefxes in ConfigChecker.from */,
    )
    .url().value;

export const BUILD_DATE = config
    .get(
        'REACT_APP_BUILD_DATE' /* TODO: configchecker can ignore prefxes in ConfigChecker.from */,
    )
    .date().value;
