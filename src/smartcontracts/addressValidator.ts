import { ergo_wallet_address } from '../interfaces/stringTypes';
import { Address } from "@coinbarn/ergo-ts";

export async function isUserAddressValid(
    userAddress: ergo_wallet_address,
): Promise<boolean> {
    try {
        return (new Address(userAddress).isValid())
    } catch (_) {
        return false;
    }
}

export async function isProxyContractAddressValid(
    userAddress: ergo_wallet_address,
): Promise<boolean> {
    // TODO: !!! Implement, value is hardcoded
    return true;
}

