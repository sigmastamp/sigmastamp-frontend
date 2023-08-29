import { IWallet } from '../00-App/App';

//todo same check for mainnet/testnet as in babelergs
//todo same modal as in babelergs

export function checkIfNautilusAvailable() {
    return (typeof ergoConnector !== "undefined");
}

export const NAUTILUS_WALLET_INSTALL_URL: string = "https://chrome.google.com/webstore/detail/nautilus-wallet/gjlmehlldlphhljhpnlddaodbjjcchai/related";

export function ErgoConnectorButton(props: {
    wallet: IWallet;
    setWallet: React.Dispatch<React.SetStateAction<IWallet>>;
}) {
    async function handleClick() {

        if (!props.wallet.connected) {

            if (!checkIfNautilusAvailable()) {
                // TODO: @hejny !!!! - this should work
                // TODO: Link to better more explainable page
                alert(
                    `You need to install Nautilus Wallet first\n ` + NAUTILUS_WALLET_INSTALL_URL,
                );
                return;
            }

            if (!ergoConnector || !ergoConnector.nautilus) return; // just to supress typescript error

            const isConnected = await ergoConnector.nautilus.connect({
                createErgoObject: false,
            });

            if (isConnected) {
                const ctx = await ergoConnector.nautilus.getContext();
                const address = await ctx.get_change_address();
                const balance = Number(await ctx.get_balance());
                props.setWallet((prev: IWallet) => ({
                    ...prev,
                    connected: true,
                    address,
                    balance,
                }));
            }

        } else {
            if (!ergoConnector || !ergoConnector.nautilus) return;
            await ergoConnector.nautilus.disconnect();
            props.setWallet((prev: IWallet) => ({ ...prev, connected: false }));
        }
    }

    return (
        <button onClick={handleClick}>
            {props.wallet.connected ? 'Disconnect wallet' : 'Connect wallet'}
        </button>
    );
}
