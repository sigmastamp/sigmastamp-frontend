import { blake2b256 } from '../hash/blake2b256';

export async function validateFirstCertificate(firstCertificate: File) {

    //FIXME TODO!!! do not use this issuingBoxes endpoint - it's not working as it should
    //It does not return all issuedBoxes so it cannot be used even in testnet not in production
    //look into doc (https://api.ergoplatform.com/api/v1/docs/) and find replacement...
    //
    //use (https://api-testnet.ergoplatform.com/api/v1/tokens/search?query=SigmaStampNFT) to find UTXO boxes
    //example result:
    //{"items":[{"id":"72349d20ccc448b76dce62b07b1467d674263ac08c27b3bfddcb800b710e36f3","boxId":"6e0f329fb4d24111e9ce6d73cd6d20ecb16187d7418d40c37fa7edbb4b5f9b71","emissionAmount":1,"name":"SigmaStampNFT","description":"Proof of existence of document with Blake2b-256 hash specified in R8 register during minting of this NFT token.","type":"EIP-004","decimals":0},{"id":"6b1d854d400c9c4ea2fcabdf89a3bf6a45119629269aabe69e4455a83941e213","boxId":"f66f34b2eec994e12c13795f4bd55d0b6ceda8bc6133553581842c1a246c9a2e","emissionAmount":1,"name":"SigmaStampNFT","description":"Proof of existence of document with Blake2b-256 hash specified in R8 register during minting of this NFT token.","type":"EIP-004","decimals":0},{"id":"6044f43afaacc3e32de17b9b3f67dcb19b30e43c01061d69e8430ece95f96a61","boxId":"b2c7db24a7797a4188156e1e25775c2e61a9af8273a871eafa62424015499cea","emissionAmount":1,"name":"SigmaStampNFT","description":"Proof of existence of document with Blake2b-256 hash specified in R8 register during minting of this NFT token.","type":"EIP-004","decimals":0},{"id":"6806a0f60358d1801a411602393396979f424b4122e8f178d20c363715bb494f","boxId":"2e2c13ede2ecc1c82c674e7915f8cba1c45e5e837cf6805e3a8adf90906de41a","emissionAmount":1,"name":"SigmaStampNFT","description":"Proof of existence of document with Blake2b-256 hash specified in R8 register during minting of this NFT token.","type":"EIP-004","decimals":0},{"id":"4ec483383f02146d9ccc5fbdd9a055da737172a29a87625b78a9656a74afcfd0","boxId":"c73a67bb9da3c72a0fe29c6e7eebcd3d73cccc9e5f081b55e0ae3e4c4b9a0a16","emissionAmount":1,"name":"SigmaStampNFT","description":"Proof of existence of document with Blake2b-256 hash specified in R8 register during minting of this NFT token.","type":"EIP-004","decimals":0},{"id":"2625c49fd0563d74c2a75aa12fe4e88e42648e09cd176aee131f3f5f7f6c8f7a","boxId":"92c31ad6eba826a5c5216c1f3334c0f9ea4f480b65580a3e7cd35ce2eeaa89a9","emissionAmount":1,"name":"SigmaStampNFT","description":"Proof of existence of document with Blake2b-256 hash specified in R8 register during minting of this NFT token.","type":"EIP-004","decimals":0},{"id":"31dbef164bf00db5a7168ad3b5e2fbfbba05c9d4317f9dafd58f9191ed7811d9","boxId":"5246b1127b5ff31fad464560ec84b3e6025c67f5c9baabeb54cc7299b8392cb1","emissionAmount":1,"name":"SigmaStampNFT","description":"Proof of existence of document with Blake2b-256 hash specified in R8 register during minting of this NFT token.","type":"EIP-004","decimals":0},{"id":"0231807a412aa0271eafe454a5efd97f311098b0081be3d81bc9a20dd714c131","boxId":"c42ed1ce4e61a1037adc3f3ad8c4c8d6148da93d971d034e59bd465ae4eec2f2","emissionAmount":1,"name":"SigmaStampNFT","description":"Proof of existence of document with Blake2b-256 hash specified in R8 register during minting of this NFT token.","type":"EIP-004","decimals":0}],"total":8}
    //
    //next for each token use its boxId and request this endpoint:
    //(https://api-testnet.ergoplatform.com/api/v1/boxes/boxId) [replace boxId with value]
    //example result:
    //{"boxId":"c42ed1ce4e61a1037adc3f3ad8c4c8d6148da93d971d034e59bd465ae4eec2f2","transactionId":"d49e45663c10f736417d4cafef3645694e2b7ee18df52597129e730ffe295a3c","blockId":"d9c3e34b80d88497f755d561fb79e405ec08fd05c9326303e9c5105c0cb9673a","value":100000000,"index":0,"globalIndex":191862,"creationHeight":89132,"settlementHeight":89134,"ergoTree":"0008cd024fb96e9f0f72939a55aa7de00bb2d9c27940a4bc2131115f6197d14be2fbfb49","address":"3WwDKYmby1UP6BhnfHqcyi9RwBRuaPt6cfXi7eHSiPuqjgWCDd5h","assets":[{"tokenId":"0231807a412aa0271eafe454a5efd97f311098b0081be3d81bc9a20dd714c131","index":0,"amount":1,"name":"SigmaStampNFT","decimals":0,"type":"EIP-004"}],"additionalRegisters":{"R5":{"serializedValue":"0e6f50726f6f66206f66206578697374656e6365206f6620646f63756d656e74207769746820426c616b6532622d32353620686173682073706563696669656420696e20523820726567697374657220647572696e67206d696e74696e67206f662074686973204e465420746f6b656e2e","sigmaType":"Coll[SByte]","renderedValue":"50726f6f66206f66206578697374656e6365206f6620646f63756d656e74207769746820426c616b6532622d32353620686173682073706563696669656420696e20523820726567697374657220647572696e67206d696e74696e67206f662074686973204e465420746f6b656e2e"},"R6":{"serializedValue":"0e0130","sigmaType":"Coll[SByte]","renderedValue":"30"},"R8":{"serializedValue":"0e203bc9e07fbfc401fd8c11cd860ece87d19f34d2bec2ad4934a068ae862c1e7d4a","sigmaType":"Coll[SByte]","renderedValue":"3bc9e07fbfc401fd8c11cd860ece87d19f34d2bec2ad4934a068ae862c1e7d4a"},"R7":{"serializedValue":"0e0201de","sigmaType":"Coll[SByte]","renderedValue":"01de"},"R9":{"serializedValue":"0e61687474703a2f2f7369676d617374616d702e6d6c2f7665726966793f686173683d61313664353730356330333138363666356335646431626133396534333533383139336234353731386166356135306131313565316338643637633230396364","sigmaType":"Coll[SByte]","renderedValue":"687474703a2f2f7369676d617374616d702e6d6c2f7665726966793f686173683d61313664353730356330333138363666356335646431626133396534333533383139336234353731386166356135306131313565316338643637633230396364"},"R4":{"serializedValue":"0e0d5369676d615374616d704e4654","sigmaType":"Coll[SByte]","renderedValue":"5369676d615374616d704e4654"}},"spentTransactionId":null,"mainChain":true}
    //
    //check whether R8 value is equal to our hash if it is make sure it's the first NFT with this hash in the blockchain
    //(this would mean that we had to ensure for example by asking explorer devs on discord or checking explorer code, that the first tokens/search endpoint is returning data ordered from oldest to newest)
    //otherwise skip this box and continue searching
    //be aware that transaction id property name has changed in the api v1 result compared to v0 result !!!
    const response = await fetch(
        `https://api-testnet.ergoplatform.com/api/v0/assets/issuingBoxes`,
    );
    const body = await response.json();

    const hash = await blake2b256(firstCertificate);

    for (const item of body.items) {
        if (item.additionalRegisters.R8 === `0e20${hash}`) {
            return item;
            // TODO: probbably last not first
        }
    }

    return null;
}

export async function getTransactionTime(txId: string) {
    // TODO FIXME!!! find api v1 equivalent !!!
    const response = await fetch(
        `https://api-testnet.ergoplatform.com/api/v0/transactions/${txId}`,
    );
    const body = await response.json();
    console.log('getTransactionTime', body);
    const timestamp = body.summary.timestamp;
    const tokenId = body.outputs[0].assets[0].tokenId;

    return { timestamp, tokenId };
}

export async function getAssetHolders(tokenId: string) {
    // TODO FIXME!!! find api v1 equivalent !!!
    const response = await fetch(
        `https://api-testnet.ergoplatform.com/api/v0/addresses/assetHolders/${tokenId}`,
    );
    const body = await response.json();
    console.log('getAssetHolders', body);
    return body;
}
