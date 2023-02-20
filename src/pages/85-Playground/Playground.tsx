import styled from 'styled-components';

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
        </PlaygroundPageDiv>
    );
}

const PlaygroundPageDiv = styled.div``;
