import { ConfigChecker } from 'configchecker';
import { Vector } from 'xyzt';
///* tslint:disable:no-var-requires */
//const packageJson = require('../package.json');
import { version } from '../package.json';
import { IFilePreviewer } from './filePreview/IFilePreviewerProps';
import { AudioFilePreview } from './filePreview/mimeTypes/audio/AudioFilePreview';
import { ImageFilePreview } from './filePreview/mimeTypes/image/ImageFilePreview';
import { CodeFilePreview } from './filePreview/mimeTypes/misc/CodeFilePreview';
import { UnknownFilePreview } from './filePreview/mimeTypes/misc/UnknownFilePreview';
import { BitcoinOracle } from './oracles/BitcoinOracle';
import { DateOracle } from './oracles/DateOracle';
import { EthereumOracle } from './oracles/EthereumOracle';
import { LitecoinOracle } from './oracles/LitecoinOracle';
import { RssFeedOracle } from './oracles/RssFeedOracle';
import { IOracle } from './oracles/_IOracle';

export const VERSION = version;

export const ORACLES: IOracle[] = [
    new BitcoinOracle(),
    new EthereumOracle(),
    new LitecoinOracle(),
    new DateOracle(),

    /*
    Note: Not working CORS in Firefox
    new NytimesOracle(),
    */

    /*
    Note: Not working CORS in Chrome and Firefox
    new RssFeedOracle(
        'TechCrunch',
        'Front page title',
        'https://techcrunch.com/feed/',
    ),
    */

    /*
    Note: Not working CORS in Chrome and Firefox
    new RssFeedOracle(
        'Huffington post',
        'Front page title',
        'https://chaski.huffpost.com/us/auto',
    ),
    */

    new RssFeedOracle(
        'Washington  post',
        'Front page title',
        'https://feeds.washingtonpost.com/rss/world',
    ),

    /**
     * TODO: @hejny Add more news sources
     * @see https://medium.com/rakuten-rapidapi/top-10-best-news-apis-google-news-bloomberg-bing-news-and-more-bbf3e6e46af6
     */
];

export const FILE_PREVIEWERS: IFilePreviewer[] = [
    new ImageFilePreview(),
    new AudioFilePreview(),
    new CodeFilePreview(),
    new UnknownFilePreview(),
];

export const PAGE_DEBUG = false;
export const PAGE_MM_TO_PX_RATIO = 2;
export const PAGE_SIZE = new Vector(210, 297);
// TODO: @hejny Maybe in second stage USA format of papers - Letter / B type

const config = ConfigChecker.from(process.env);

// @deprecated TODO: @hejny <- @nitram147 see comments bellow
// @deprecated TODO: - add testnet/mainnet switch
// @deprecated TODO: - add config for ergo explorer url and subdomains for testnet/mainnet variant

/**
 * @deprecated
 */
export const ERGO_ASSEMBLER_URL = new URL(
    `https://assembler.sigmastamp.ml:14747`,
); /* <- Just a temporary fake value */

/*config
    .get(
        'REACT_APP_ERGO_ASSEMBLER_URL' /* TODO: @hejny configchecker can ignore prefxes in ConfigChecker.from * /,
    )
    .url()
    // TODO: @hejny .checkHttps()
    // TODO: @hejny .checkNativePort()
    // TODO: @hejny universal .check() in configchecker
    .required().value!;
  */

export const BUILD_DETAILS_URL = config
    .get(
        'REACT_APP_BUILD_DETAILS_URL' /* TODO: @hejny configchecker can ignore prefxes in ConfigChecker.from */,
    )
    .url().value;

export const BUILD_DATE = config
    .get(
        'REACT_APP_BUILD_DATE' /* TODO: @hejny configchecker can ignore prefxes in ConfigChecker.from */,
    )
    .date().value;
