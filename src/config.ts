import { ConfigChecker } from 'configchecker';
import { Vector } from 'xyzt';
///* tslint:disable:no-var-requires */
//const packageJson = require('../package.json');
import { version } from '../package.json';
import { BitcoinOracle } from './oracles/BitcoinOracle';
import { DateOracle } from './oracles/DateOracle';
import { EthereumOracle } from './oracles/EthereumOracle';
import { LitecoinOracle } from './oracles/LitecoinOracle';
import { NytimesOracle } from './oracles/NytimesOracle';
import { IOracle } from './oracles/_IOracle';

export const VERSION = version;

export enum ROUTES {
    FirstCertificate = '/',
    SecondCertificate = '/verify',
    Blockchains = '/blockchains',
    Oracles = '/oracles',
    SampleCertificates = '/sample-certificates',
    HowItWorks = '/manual',
    Faq = '/faq',
    TechnicalStatus = '/status',
    About = '/about',
}

export const ORACLES: IOracle[] = [
    new BitcoinOracle(),
    new EthereumOracle(),
    new LitecoinOracle(),
    new DateOracle(),
    new NytimesOracle(),
];

export const PAGE_DEBUG = false;
export const PAGE_MM_TO_PX_RATIO = 2;
export const PAGE_SIZE = new Vector(210, 297);
// TODO: Maybe in second stage USA format of papers - Letter / B type

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
