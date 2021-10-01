import { ergo_format, string_url } from '../../../interfaces/stringTypes';
import { convertToHex } from '../../../utils/convertToHex';
import { hexToErgoFormat } from '../hex/hexToErgoFormat';

/**
 *
 * @param url string
 * @returns ergo format string used for example in R8
 */
export function urlToErgoFormat(url: string_url): ergo_format {
    return hexToErgoFormat(convertToHex(url));
}
