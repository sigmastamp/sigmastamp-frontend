import { ergo_format, string_url } from '../../../interfaces/stringTypes';
import { convertToHex } from '../../../utils/convertToHex';

/**
 *
 * @param url string
 * @returns ergo format string used for example in R8
 */
export function urlToErgoFormat(url: string_url): ergo_format {
    return `0e${url.length.toString(16)}${convertToHex(url)}`;
}
