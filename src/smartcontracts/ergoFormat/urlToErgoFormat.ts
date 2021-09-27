import { ergo_format, string_url } from '../../interfaces/stringTypes';

/**
 *
 * @param url string
 * @returns  ergo format string used for example in R8
 */
export function urlToErgoFormat(url: string_url): ergo_format {
    // TODO: !!! Encode url
    return `e20${url}`;
}
