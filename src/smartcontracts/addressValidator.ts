import { Address } from '@coinbarn/ergo-ts';
import { ergo_wallet_address } from '../interfaces/stringTypes';

export async function isUserAddressValid(
    userAddress: ergo_wallet_address,
): Promise<boolean> {
    try {
        return new Address(userAddress).isValid();
    } catch (_) {
        return false;
    }
}

export async function isProxyContractAddressValid(
    userAddress: ergo_wallet_address,
): Promise<boolean> {
    // TODO: !!!  @nitram147 -> @hejny Implement, value is hardcoded
    return true;
}
