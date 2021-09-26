import { ConfigChecker } from 'configchecker';
///* tslint:disable:no-var-requires */
//const packageJson = require('../package.json');
import { version } from '../package.json';

export const VERSION = version;

const config = ConfigChecker.from(process.env);

// TODO: !!! check running on native port
// TODO: !!! check HTTPs
export const ERGO_ASSEMBLER_URL = config
    .get('ERGO_ASSEMBLER_URL')
    .url()
    .required().value!;
