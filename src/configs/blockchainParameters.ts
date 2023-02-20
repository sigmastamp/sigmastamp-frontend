export const USE_MAINNET = true;

export const NANO_ERGS_IN_ONE_ERG: number = 1000000000;

export const MIN_NANO_ERGS_IN_BOX: number = 1000000;

// export const MAINNET_BLOCK_TIME_SECONDS: number = 120;
// export const TESTNET_BLOCK_TIME_SECONDS: number = 5;
// export const BLOCK_TIME_SECONDS: number =
// 	USE_MAINNET ? MAINNET_BLOCK_TIME_SECONDS : TESTNET_BLOCK_TIME_SECONDS;

export const NFT_CREATION_TRANSACTION_MINER_FEE: number = 1000000;

// export const ADDRESS_NETWORK_TYPE_MAINNET: number = 0x00;
// export const ADDRESS_NETWORK_TYPE_TESTNET: number = 0x10;
// export const ADDRESS_NETWORK_TYPE_CURRENT: number =
// 	USE_MAINNET ? ADDRESS_NETWORK_TYPE_MAINNET : ADDRESS_NETWORK_TYPE_TESTNET;

export const MAINNET_EXPLORER_URL: string = "https://api.ergoplatform.com";
export const TESTNET_EXPLORER_URL: string = "https://api-testnet.ergoplatform.com";
export const EXPLORER_URL = USE_MAINNET ? MAINNET_EXPLORER_URL : TESTNET_EXPLORER_URL;

export const EXPLORER_TOKEN_SEARCH_PREFIX: string = "/api/v1/tokens/search?query=";
export const EXPLORER_TOKEN_SEARCH_SUFIX: string = "";

/*
export const MAINNET_NODE_URL: string = "http://213.239.193.208:9053";
//export const MAINNET_NODE_URL: string = "https://ergonode.blocpow.io"; <-- not working anymore :-(
export const TESTNET_NODE_URL: string = "http://213.239.193.208:9052";
//export const TESTNET_NODE_URL: string = "https://ergotestnetnode.blocpow.io";
export const NODE_URL = USE_MAINNET ? MAINNET_NODE_URL : TESTNET_NODE_URL;
*/

/*
export const EXPLORER_BALANCE_ENDPOINT_PREFIX: string = "/api/v1/addresses/";
export const EXPLORER_BALANCE_ENDPOINT_SUFIX: string = "/balance/total";

export const EXPLORER_TOKEN_INFO_PREFIX: string = "/api/v1/tokens/";
export const EXPLORER_TOKEN_INFO_SUFIX: string = "";
*/

export const EXPLORER_BLOKCHAIN_HEIGHT_PREFIX: string = "/api/v1/blocks?limit=1";
export const EXPLORER_BLOKCHAIN_HEIGHT_SUFIX: string = "";

/*
export const EXPLORER_ASSET_SEARCH_PREFIX: string = "/api/v1/assets/search/byTokenId?query=";
export const EXPLORER_ASSET_SEARCH_SUFIX: string = "";
*/

export const EXPLORER_BOX_INFO_PREFIX: string = "/api/v1/boxes/";
export const EXPLORER_BOX_INFO_SUFIX: string = "";

/*
export const EXPLORER_BOXES_BY_ADDRESS_PREFIX: string = "/api/v1/boxes/byAddress/";
export const EXPLORER_BOXES_BY_ADDRESS_SUFIX: string = "";

export const EXPLORER_UNSPENT_BOXES_BY_ADDRESS_PREFIX: string = "/api/v1/boxes/unspent/byAddress/";
export const EXPLORER_UNSPENT_BOXES_BY_ADDRESS_SUFIX: string = "";
*/

export const EXPLORER_UNSPENT_BOXES_BY_TOKEN_ID_PREFIX: string = "/api/v1/boxes/unspent/byTokenId/";
export const EXPLORER_UNSPENT_BOXES_BY_TOKEN_ID_SUFIX: string = "";

/*
export const EXPLORER_BOX_BY_ID_PREFIX: string = "/api/v1/boxes/";
export const EXPLORER_BOX_BY_ID_SUFFIX: string = "";
*/

export const EXPLORER_TRANSACTION_INFO_PREFIX: string = "/api/v1/transactions/";
export const EXPLORER_TRANSACTION_INFO_SUFIX: string = "";

/*
export const NODE_ADDRESS_TO_TREE_PREFIX: string = "/script/addressToTree/";
export const NODE_ADDRESS_TO_TREE_SUFIX: string = "";
*/
