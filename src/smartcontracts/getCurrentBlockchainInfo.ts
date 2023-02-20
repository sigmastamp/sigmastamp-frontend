// TODO @hejny <- @nitram147 Unhardcode API URL, use API from config
export async function getCurrentBlockchainHeight(): Promise<number> {
    const response = await fetch(
        `https://api-testnet.ergoplatform.com/api/v1/info`,
    );

    const body = await response.json();

    return body.height;
}

// TODO @hejny <- @nitram147 Unhardcode API URL, use API from config
// TODO @hejny @nitram147 However API itself is deprecated and returning (at least for me) suspicious looking fees
// better hardcode fees into app config so this function will be either returning fee from config or the value
// will be fetched directly from config in place where its needed...
export async function getCurrentBlockchainMinFeeRequired(): Promise<number> {
    const response = await fetch(
        `https://api-testnet.ergoplatform.com/api/v1/info`,
    );

    const body = await response.json();

    const inputCost = body.params.inputCost;
    const outputCost = body.params.outputCost;
    const tokenAccessCost = body.params.tokenAccessCost;

    //this should be true for token minting transaction using input from proxy smart contract address UTXO
    return 1 * inputCost + 3 * outputCost + 1 * tokenAccessCost;
}
