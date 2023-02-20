export function ErgoConnectorButton() {
  return (
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
  );
}