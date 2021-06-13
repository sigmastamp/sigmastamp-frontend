import { blake2b256 } from '../hash/blake2b256';

export async function validateFirstCertificate(firstCertificate: File) {
    const response = await fetch(`https://api-testnet.ergoplatform.com/api/v0/assets/issuingBoxes`);
    const body = await response.json();

    const hash = await blake2b256(firstCertificate);

    for (const item of body.items) {
        if (item.additionalRegisters['R8'] === `0e20${hash}`) {
            return item;
            // TODO: probbably last not first
        }
    }

    return null;
}

export async function getTransactionTime(txId: string) {
    const response = await fetch(`https://api-testnet.ergoplatform.com/api/v0/transactions/${txId}`);
    const body = await response.json();
    console.log('getTransactionTime', body);
    const timestamp = body.summary.timestamp;
    const tokenId = body.outputs[0].assets[0].tokenId

    return {timestamp,tokenId}
}

export async function getAssetHolders(tokenId: string) {
    const response = await fetch(`https://api-testnet.ergoplatform.com/api/v0/addresses/assetHolders/${tokenId}`);
    const body = await response.json();
    console.log('getAssetHolders', body);
    return body;
}
