import { blake2b256 } from '../hash/blake2b256';

import {
    EXPLORER_URL,
    EXPLORER_BOX_INFO_PREFIX,
    EXPLORER_TOKEN_SEARCH_PREFIX,
    EXPLORER_TRANSACTION_INFO_PREFIX,
    EXPLORER_UNSPENT_BOXES_BY_TOKEN_ID_PREFIX
} from "../configs/blockchainParameters";

import {
    SIGMASTAMP_NFT_NAME,
    SIGMASTAMP_ASSET_TYPE
} from "../configs/SigmaStampConfig";

/**
 * TODO: rename function below
 */
export async function validateFirstCertificate(firstCertificate: File) {
    const hash = await blake2b256(firstCertificate);

    const tokensResponse = await fetch(
        EXPLORER_URL + EXPLORER_TOKEN_SEARCH_PREFIX + SIGMASTAMP_NFT_NAME,
    );
    const tokensBody = await tokensResponse.json();

    for (const item of tokensBody.items) {
        //skip non-NFTs
        if (item.emissionAmount !== 1) continue;

        const boxId = item.boxId;

        const boxesResponse = await fetch(
            EXPLORER_URL + EXPLORER_BOX_INFO_PREFIX + `${boxId}`,
        );

        const boxesBody = await boxesResponse.json();

        //skip non-SigmaStampNFT types
        if (boxesBody.additionalRegisters.R7.renderedValue !== SIGMASTAMP_ASSET_TYPE) continue;

        if (boxesBody.additionalRegisters.R8.renderedValue === `${hash}`) {
            return boxesBody;
        }
    }

    return null;
}

//TODO: @nitram147 - function to check whether is hash already in blockchain
//it would be similar to validateFirstCertificate function
//maybe it would be great to extract the core functionality into one function and then only make wrapper for it (so validateFirstCertificate will be only a wrapper)

export async function getTransactionTime(txId: string) {
    const response = await fetch(
        EXPLORER_URL + EXPLORER_TRANSACTION_INFO_PREFIX + `${txId}`,
    );
    const body = await response.json();

    console.log('getTransactionTime', body);

    const timestamp = body.timestamp;
    const tokenId = body.outputs[0].assets[0].tokenId;

    return { timestamp, tokenId };
}

// TODO @hejny <- @nitram147 Unhardcode API URL move it to the config file
export async function getNFTHolderAddress(tokenId: string) {
    const response = await fetch(
        EXPLORER_URL + EXPLORER_UNSPENT_BOXES_BY_TOKEN_ID_PREFIX + `${tokenId}`,
    );
    const body = await response.json();

    console.log('getNFTHolderAddress', body);

    //check that there is only one holder (it means that it is NFT and also that it exists)
    if (body.total !== 1) return null;

    return body.items[0].address;
}
