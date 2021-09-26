import { ConfigChecker } from 'configchecker';
///* tslint:disable:no-var-requires */
//const packageJson = require('../package.json');
import { version } from '../package.json';

export const VERSION = version;

const config = ConfigChecker.from(process.env);

export const ERGO_ASSEMBLER_URL = config
    .get(
        'REACT_APP_ERGO_ASSEMBLER_URL' /* TODO: configchecker can ignore prefxes in ConfigChecker.from */,
    )
    .url()
    // TODO: .checkHttps()
    // TODO: .checkNativePort()
    // TODO: universal .check() in configchecker
    .required().value!;

export const BUILD_DATE = config
    .get(
        'REACT_APP_BUILD_DATE' /* TODO: configchecker can ignore prefxes in ConfigChecker.from */,
    )
    .date().value;
