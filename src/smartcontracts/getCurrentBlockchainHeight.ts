export async function getCurrentBlockchainHeight(): Promise<number> {

    const response = await fetch(
        `https://api-testnet.ergoplatform.com/api/v1/info`,
    );
    
    const body = await response.json();

    return body.height;
}
