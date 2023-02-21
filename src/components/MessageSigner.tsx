import { useEffect, useState } from 'react';
import { IWallet } from '../pages/00-App/App';

interface IAddressesLoader {
    loaded: boolean;
    addresses: string[];
}

const DEFAULT_ADDRESSES_LOADER_STATE: IAddressesLoader = {
    loaded: false,
    addresses: [],
};

interface IUserIsOwnerOfAddress {
    ownerOfStamperAddress: boolean;
    ownerOfHolderAddress: boolean;
    availableIntersectingAddresses: string[];
}

const DEFAULT_USER_IS_OWNER_OF_ADDRESS_STATE: IUserIsOwnerOfAddress = {
    ownerOfStamperAddress: false,
    ownerOfHolderAddress: false,
    availableIntersectingAddresses: [],
};

export function MessageSigner(props: {
    wallet: IWallet;
    stamperAddress: string;
    holderAddress: string;
}) {
    const [loadedAddresses, setLoadedAddresses] = useState<IAddressesLoader>(
        DEFAULT_ADDRESSES_LOADER_STATE,
    );
    const [userIsOwner, setUserIsOwner] = useState<IUserIsOwnerOfAddress>(
        DEFAULT_USER_IS_OWNER_OF_ADDRESS_STATE,
    );

    useEffect(() => {
        setLoadedAddresses(DEFAULT_ADDRESSES_LOADER_STATE);
        if (!ergoConnector || !ergoConnector.nautilus) return;
        if (!props.wallet.connected) return;
        ergoConnector.nautilus.getContext().then((ctx) => {
            ctx.get_used_addresses().then((addresses) => {
                const intersectingAddresses: string[] = [];
                if (addresses.indexOf(props.stamperAddress) > -1)
                    intersectingAddresses.push(props.stamperAddress);
                if (addresses.indexOf(props.holderAddress) > -1)
                    intersectingAddresses.push(props.holderAddress);
                if (
                    intersectingAddresses.length === 2 &&
                    intersectingAddresses[0] === intersectingAddresses[1]
                )
                    intersectingAddresses.pop();
                setUserIsOwner({
                    ownerOfStamperAddress:
                        addresses.indexOf(props.stamperAddress) > -1,
                    ownerOfHolderAddress:
                        addresses.indexOf(props.holderAddress) > -1,
                    availableIntersectingAddresses: intersectingAddresses,
                });
                setLoadedAddresses({ loaded: true, addresses: addresses });
            });
        });
    }, [props.wallet, props.stamperAddress, props.holderAddress]);

    function signButtonClickHandler() {
        if (!ergoConnector || !ergoConnector.nautilus) return;
        if (!props.wallet.connected) return;

        //todo refs to element values (selected address and text in textarea)
        ergoConnector.nautilus.getContext().then((ctx) => {
            //todo fix address bellow, same for message
            ctx.sign_data(props.holderAddress, 'message').then((res) => {
                console.log(res);
            });
        });
    }

    return (
        <div>
            {!props.wallet.connected ? (
                <h3>
                    Are you the original "stamper" or current holder of NFT
                    token and want to sign a message? Please connect a wallet
                    first.
                </h3>
            ) : !loadedAddresses.loaded ? (
                <h3>Loading your addresses, wait a bit...</h3>
            ) : !userIsOwner.ownerOfStamperAddress &&
              !userIsOwner.ownerOfHolderAddress ? (
                <h3>
                    Unfortunately, you are not owner of any of addresses
                    associated with this NFT
                </h3>
            ) : (
                <div>
                    <label for="address_select">Select address:</label>
                    <br />
                    <select id="address_select">
                        {userIsOwner.availableIntersectingAddresses.map(
                            (addr: string) => (
                                <option value={addr} key={addr}>
                                    {addr}
                                </option>
                            ),
                        )}
                    </select>
                    <br />
                    <textarea
                        name="message"
                        placeholder="Fill your message here"
                    ></textarea>
                    <br />
                    <span style={{ color: 'red' }}>
                        Message signing is currently still not implemented in
                        Nautilus Wallet :-(
                    </span>
                    <br />
                    <button onClick={signButtonClickHandler} disabled={true}>
                        Sign message
                    </button>
                </div>
            )}
        </div>
    );
}
