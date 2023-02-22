import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { UploadZone } from '../../components/UploadZone';
import { UploadZoneSigmastampContent } from '../../components/UploadZoneSigmastampContent';
import { blake2b256 } from '../../hash/blake2b256';
import {
    create_transaction,
    get_minimum_required_balance,
    get_minimum_required_balance_ergs,
    sign_tx,
    submit_tx,
} from '../../scripts/transactionBuilder';
// import { ErgoConnectorButton } from './ErgoConnectorButton';
import { IWallet } from '../00-App/App';
import { checkIfNautilusAvailable } from "../../components/ErgoConnectorButton";

function check_whether_there_is_enough_balance(balance: number): boolean {
    return balance > get_minimum_required_balance();
}

export function PlaygroundPage(props: { wallet: IWallet }) {
    const [file, setFile] = useState<any>(null);
    const [sentTXHash, setSentTXHash] = useState<string>('');

    function stampItButtonHandler() {
        if (file === null) return;
        create_transaction(props.wallet.address, file.hash).then((tx: any) => {
            sign_tx(tx).then((stx) => {
                if (stx === null) {
                    alert('Problem during transaction signing, try again!');
                    return;
                }
                submit_tx(stx).then((txId) => {
                    if (txId === null) {
                        alert(
                            'Submission of transaction into blockchain network failed, try again!',
                        );
                        return;
                    }
                    setSentTXHash(txId);
                });
            });
        });
    }

    return (
        <PlaygroundPageDiv>
            <h2>Stamp your document</h2>
            {!props.wallet.connected ? (
                checkIfNautilusAvailable() ?
                    <p>Please connect the wallet first</p>
                    : <p>Please install Nautilus wallet which is required for this section to work</p>
            ) : !check_whether_there_is_enough_balance(props.wallet.balance) ? (
                <p>
                    There is not enough balance for stamping process in your
                    wallet. Required amount is at least{' '}
                    {get_minimum_required_balance_ergs()} ERGs.
                </p>
            ) : file === null ? (
                <div><span>(Everything will be executed <Link to="/wiki#everything-is-executed-localy" target="_blank" rel="noopener noreferrer">localy</Link>, file is not being send anywhere ;-))</span>
                    <br /><br />
                    <UploadZone
                        onFiles={async (files) => {
                            const firstFile = files[0];
                            const hash = await blake2b256(firstFile);
                            setFile({ file: firstFile, hash });
                        }}
                        isClickable
                    >
                        <UploadZoneSigmastampContent>
                            Drop the files you want to timestamp here!
                        </UploadZoneSigmastampContent>
                    </UploadZone></div>
            ) : sentTXHash === '' ? (
                <div>
                    <p>{file.file.name}</p>
                    <p>{file.hash}</p>
                    Stamp your file and receive SigmaStampNFT to your address:{' '}
                    {props.wallet.address} by pressing following button:
                    <br />
                    <button onClick={stampItButtonHandler}>Stamp it!</button>
                </div>
            ) : (
                <p>Stamping TX with id {sentTXHash} was successfuly sent!</p>
            )}
        </PlaygroundPageDiv>
    );
}

const PlaygroundPageDiv = styled.div``;

/**
 * TODO: @hejny !!!! Here should be some observing of the transaction status ?nothing/unknown -> unconfirmed -> confirmed
 *       [🍚] @see https://explorer.ergoplatform.com/en/transactions/d06fb7239d92f575f83a7f9ea51e5c055acefd848cec2b41f7b11591030af2b6
 */
