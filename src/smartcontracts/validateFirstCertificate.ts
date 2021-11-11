import { blake2b256 } from '../hash/blake2b256';

//TODO rename function below
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

        //skip non-SigmaStampNFT types
        //(0x01 specifies NFT category, 0xde specifies SigmaStampNFT subcategory)
        //see (https://github.com/ergoplatform/eips/blob/master/eip-0004.md) for more info
        if(boxesBody.additionalRegisters.R7.renderedValue !== `01de`) continue;

        if(boxesBody.additionalRegisters.R8.renderedValue === `${hash}`){
            return boxesBody;
        }
    }

    return null;
}

//TODO @nitram147 - function to check whether is hash already in blockchain
//it would be similar to validateFirstCertificate function
//maybe it would be great to extract the core functionality into one function and then only make wrapper for it (so validateFirstCertificate will be only a wrapper)

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
    // TODO FIXME!!! find api v1 equivalent !!! (@nitram147)
    // possible replacement is to use:
    // (https://api-testnet.ergoplatform.com/api/v1/assets/search/byTokenId?query=tokenId)
    // this will return all boxes (even spent ones) which has holded or still hold tokenId
    // because we use NFT it means that the last box will be box of current holder
    // than use this api endpoint:
    // (https://api-testnet.ergoplatform.com/api/v1/boxes/boxId)
    // to retrieve address of current NFT holder
    // todo - ask on discord whether there is a better way or we can stay with v0 endpoint

    //UPDATE: maybe it would be better to use just this api endpoint:
    //https://api-testnet.ergoplatform.com/api/v1/boxes/unspent/byTokenId/id
    //because NFT is unique there should be only one UTXO (endpoint parameter unspent) containing
    //this NFT, api response also contains address, so it probably could be done with single api call
    //TODO @nitram147 - play with it to find whether this endpoint work as expected
    const response = await fetch(
        `https://api-testnet.ergoplatform.com/api/v0/addresses/assetHolders/${tokenId}`,
    );
    const body = await response.json();
    console.log('getAssetHolders', body);
    return body;
}
