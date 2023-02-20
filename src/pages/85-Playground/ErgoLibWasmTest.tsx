let ergolib = import('ergo-lib-wasm-browser');

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

export function ErgoLibWasmTest() {
    return (
        <button
            onClick={async () => {
                let wasm = await ergolib;

                // !!!
            }}
        >
            Connect to Nautilus wallet
        </button>
    );
}
