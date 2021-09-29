import { ergo_format, string_url } from '../../../interfaces/stringTypes';

/**
 *
 * @param url string
 * @returns  ergo format string used for example in R8
 */
export function urlToErgoFormat(url: string_url): ergo_format {
    // TODO: !!! Encode url
    return `0e${url.length.toString(16)}${convertToHex(url)}`;
}

/**
 * TODO: !!! Anotate, type and test
 */
function convertFromHex(hex) {
    var hex = hex.toString(); //force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}

/**
 * TODO: !!! Anotate, type and test
 */
function convertToHex(str) {
    var hex = '';
    for (var i = 0; i < str.length; i++) {
        hex += '' + str.charCodeAt(i).toString(16);
    }
    return hex;
}
