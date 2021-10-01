import { ergo_format, string_hex } from '../../../interfaces/stringTypes';

/**
 *
 * @param hex string
 * @returns ergo format string used for example in R8
 */
export function hexToErgoFormat(hex: string_hex): ergo_format {
    return `0e${hex.length.toString(16)}${hex}`;
}
