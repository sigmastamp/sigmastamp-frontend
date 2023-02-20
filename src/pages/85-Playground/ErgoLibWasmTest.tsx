let ergolib = import('ergo-lib-wasm-browser');

export function ErgoLibWasmTest() {
    return (
        <button
            onClick={async () => {
                let wasm = await ergolib;
                const result = wasm.TokenId.from_str('2b').to_str();

                console.log(result);
            }}
        >
            Connect to Nautilus wallet
        </button>
    );
}
