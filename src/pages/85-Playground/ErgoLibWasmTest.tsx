let ergolib = import('ergo-lib-wasm-browser');

export function ErgoLibWasmTest() {
    return (
        <button
            onClick={async () => {
                let wasm = await ergolib;
                const result = wasm.TokenId.from_str(
                    '65e3b680cb88cb4609a0414757b1586749071cc8a4954de6c914911f63265f68',
                ).to_str();

                console.log(result);
            }}
        >
            Test WASM functionality
        </button>
    );
}
