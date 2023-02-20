import styled from 'styled-components';

let ergolib = import("ergo-lib-wasm-browser");

async function test_it(){
    let wasm = (await ergolib);
    console.log(wasm.TokenId.from_str("65e3b680cb88cb4609a0414757b1586749071cc8a4954de6c914911f63265f68").to_str());
}

export function PlaygroundPage() {
    return (
        <PlaygroundPageDiv>
            <h2>Playground</h2>
            <h2>@nautilus</h2>

            <button
                onClick={async () => {
                    if (!ergoConnector || !ergoConnector.nautilus) {
                        // TODO: Link to better more explainable page
                        alert(
                            `You need to install Nautilus Wallet first\n https://chrome.google.com/webstore/detail/nautilus-wallet/gjlmehlldlphhljhpnlddaodbjjcchai/related`,
                        );
                        return;
                    }

                    const isConnected = await ergoConnector.nautilus.connect({
                        createErgoObject: false,
                    });

                    if (isConnected) {
                        alert(`Sucessfully connected!`);
                    }
                }}
            >
                Connect to Nautilus wallet
            </button>

            <button
                onClick ={async () => {test_it();}}>Test
            </button>
        </PlaygroundPageDiv>
    );
}

const PlaygroundPageDiv = styled.div``;
