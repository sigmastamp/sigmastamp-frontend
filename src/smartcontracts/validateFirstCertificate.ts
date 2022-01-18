import { blake2b256 } from '../hash/blake2b256';

//TODO: rename function below
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

//TODO: @nitram147 - function to check whether is hash already in blockchain
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

export async function getNFTHolderAddress(tokenId: string) {

    const response = await fetch(
        `https://api-testnet.ergoplatform.com/api/v1/boxes/unspent/byTokenId/${tokenId}`,
    );
    const body = await response.json();

    console.log('getNFTHolderAddress', body);

    //check that there is only one holder (it means that it is NFT and also that it exists)
    if(body.total !== 1) return null;

    return body.items[0].address;
}
