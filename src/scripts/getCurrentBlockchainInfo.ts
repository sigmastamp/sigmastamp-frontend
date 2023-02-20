import {
    EXPLORER_URL,
    EXPLORER_BLOKCHAIN_HEIGHT_PREFIX
} from "../configs/blockchainParameters";

export async function getBlockHeight(): Promise<number> {
    const response = await fetch(EXPLORER_URL + EXPLORER_BLOKCHAIN_HEIGHT_PREFIX);
    const body = await response.json();
    return body.items[0].height;
}
