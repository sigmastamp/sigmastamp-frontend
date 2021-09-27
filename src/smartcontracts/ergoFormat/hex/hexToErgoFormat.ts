import { ergo_format, string_hex } from '../../../interfaces/stringTypes';

/**
 *
 * @param hex string
 * @returns ergo format string used for example in R8
 */
export function hexToErgoFormat(hex: string_hex): ergo_format {
    // TODO: !!! Encode hex
    return `0e20${hex}`;
}
