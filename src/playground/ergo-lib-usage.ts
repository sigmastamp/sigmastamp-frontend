import * as ergolib from '../libs/ergo/ergo-lib-wasm.js';

ergolib.TokenId.from_str('SemDasHexValueNejakehoHashu256bitoveho').to_str();

/*
(async () => {
    let ergolib = import('ergo-lib-wasm-nodejs');
    let wasm = await ergolib;
    wasm.TokenId.from_str('SemDasHexValueNejakehoHashu256bitoveho').to_str();
})();
*/

/*
declare const ergoConnector: {
    nautilus: {
        connect(
            settings: { createErgoObject: boolean } | undefined,
        ): Promise<boolean>;
        isConnected(): Promise<boolean>;
        disconnect(): Promise<boolean>;
        getContext(): Promise<object>;
    };
};
*/

/**
 * TODO: Remove from dependencies one of 'ergo-lib-wasm-nodejs' / 'ergo-lib-wasm-browser'
 */
