import { ergo_format, string_hex } from '../../../interfaces/stringTypes';

/**
 *
 * @param hex string
 * @returns ergo format string used for example in R8
 */
export function hexToErgoFormat(hex: string_hex): ergo_format {
    // TODO: !!! Unhardcode length of ergo format string
    return `0e20${hex}`;
}
