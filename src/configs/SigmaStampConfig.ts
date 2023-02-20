import { USE_MAINNET } from "./blockchainParameters";

export const SIGMASTAMP_SERVICE_FEE_AMOUNT: number = 100000000;

export const MAINNET_SERVICE_FEE_ADDRESS: string = "todo";
export const TESTNET_SERVICE_FEE_ADDRESS: string = "todo";

export const SIGMASTAMP_SERVICE_FEE_ADDRESS: string =
	(USE_MAINNET) ? MAINNET_SERVICE_FEE_ADDRESS : TESTNET_SERVICE_FEE_ADDRESS;

// production value is "SigmaStampNFT", but for now keep it with test value
export const SIGMASTAMP_NFT_NAME: string = "TestStampNFT";

//production value is "01de", but for now keep it with test value
//(0x01 specifies NFT category, 0xde specifies SigmaStampNFT subcategory)
//see (https://github.com/ergoplatform/eips/blob/master/eip-0004.md) for more info
export const SIGMASTAMP_ASSET_TYPE: string = "018d";
