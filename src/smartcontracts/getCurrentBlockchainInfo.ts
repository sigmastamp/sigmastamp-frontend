
/**
 * TODO: !!! @nitram147 Is it @deprecated
 */
export async function getCurrentBlockchainHeight(): Promise<number> {
    const response = await fetch(
        `https://api-testnet.ergoplatform.com/api/v1/info`,
    );

    const body = await response.json();

    return body.height;
}

/**
 * TODO: !!! @nitram147 Is it @deprecated
 * TODO: - probably return raw fee costs, so we can use them in different ways later on
 */
export async function getCurrentBlockchainMinFeeRequired(): Promise<number> {
    const response = await fetch(
        `https://api-testnet.ergoplatform.com/api/v1/info`,
    );

    const body = await response.json();

    const inputCost = body.params.inputCost;
    const outputCost = body.params.outputCost;
    const tokenAccessCost = body.params.tokenAccessCost;

    //this should be true for token minting transaction using input from proxy smart contract address UTXO
    return 1 * inputCost + 2 * outputCost + 1 * tokenAccessCost;
}
