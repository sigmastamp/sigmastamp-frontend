import { blake2b256 } from '../hash/blake2b256';

export async function validateFirstCertificate(firstCertificate: File) {

    const hash = await blake2b256(firstCertificate);

    const tokensResponse = await fetch(
        `https://api-testnet.ergoplatform.com/api/v1/tokens/search?query=SigmaStampNFT`,
    );
    const tokensBody = await tokensResponse.json();

    for(const item of tokensBody.items){

        //skip non-NFTs
        if(item.emissionAmount !== 1) continue;

        const boxId = item.boxId;

        const boxesResponse = await fetch(
            `https://api-testnet.ergoplatform.com/api/v1/boxes/${boxId}`,
        );

        const boxesBody = await boxesResponse.json();

        if(boxesBody.additionalRegisters.R8.renderedValue === `${hash}`){
            return boxesBody;
        }
    }

    return null;
}

export async function getTransactionTime(txId: string) {

    const response = await fetch(
        `https://api-testnet.ergoplatform.com/api/v1/transactions/${txId}`,
    );
    const body = await response.json();
    console.log('getTransactionTime', body);
    const timestamp = body.timestamp;
    const tokenId = body.outputs[0].assets[0].tokenId;

    return { timestamp, tokenId };
}

export async function getAssetHolders(tokenId: string) {
    // TODO FIXME!!! find api v1 equivalent !!!
    // possible replacement is to use:
    // (https://api-testnet.ergoplatform.com/api/v1/assets/search/byTokenId?query=tokenId)
    // this will return all boxes (even spent ones) which has holded or still hold tokenId
    // because we use NFT it means that the last box will be box of current holder
    // than use this api endpoint:
    // (https://api-testnet.ergoplatform.com/api/v1/boxes/boxId)
    // to retrieve address of current NFT holder
    // todo - ask on discord whether there is a better way or we can stay with v0 endpoint
    const response = await fetch(
        `https://api-testnet.ergoplatform.com/api/v0/addresses/assetHolders/${tokenId}`,
    );
    const body = await response.json();
    console.log('getAssetHolders', body);
    return body;
}
