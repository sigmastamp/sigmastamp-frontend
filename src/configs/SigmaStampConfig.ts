import { USE_MAINNET } from "./blockchainParameters";

export const SIGMASTAMP_SERVICE_FEE_AMOUNT: number = 10000000;

export const MAINNET_SERVICE_FEE_ADDRESS: string = "9i5EyNjeWHaRwCxjdn8PfBcyB3MzrbdBjNCjcxbF3tR19fdo8NP";
export const TESTNET_SERVICE_FEE_ADDRESS: string = "todo";

export const SIGMASTAMP_SERVICE_FEE_ADDRESS: string =
	(USE_MAINNET) ? MAINNET_SERVICE_FEE_ADDRESS : TESTNET_SERVICE_FEE_ADDRESS;

// production value is "SigmaStampNFT", but for now keep it with test value
export const SIGMASTAMP_NFT_NAME: string = "TestStampNFTAlpha";

//production value is "01de", but for now keep it with test value
//(0x01 specifies NFT category, 0xde specifies SigmaStampNFT subcategory)
//see (https://github.com/ergoplatform/eips/blob/master/eip-0004.md) for more info
export const SIGMASTAMP_ASSET_TYPE: string = "0173";

export const SIGMASTAMP_NFT_DESCRIPTION: string = "Proof of existence of document with Blake2b-256 hash specified in R8 register during minting of this NFT token.";
