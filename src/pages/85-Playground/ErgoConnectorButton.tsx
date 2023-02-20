import { IWallet } from './Playground';

export function ErgoConnectorButton(props: {
    wallet: IWallet;
    setWallet: React.Dispatch<React.SetStateAction<IWallet>>;
}) {
    async function handleClick() {
        if (!props.wallet.connected) {
            if (!ergoConnector || !ergoConnector.nautilus) {
                // TODO: @hejny !!!! - this should work
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
                const ctx = await ergoConnector.nautilus.getContext();
                const address = await ctx.get_change_address();
                const balance = Number(await ctx.get_balance());
                props.setWallet((prev: IWallet) => ({
                    ...prev,
                    connected: true,
                    address: address,
                    balance: balance,
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
            {props.wallet.connected ? 'Disconnect' : 'Connect'}
        </button>
    );
}
