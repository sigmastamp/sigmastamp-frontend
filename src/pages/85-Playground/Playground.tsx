import styled from "styled-components";
import { useState } from "react";
import { ErgoConnectorButton } from "./ErgoConnectorButton";
import { ErgoLibWasmTest } from "./ErgoLibWasmTest";
import { UploadZone } from "../../components/UploadZone";
import { UploadZoneSigmastampContent } from "../../components/UploadZoneSigmastampContent";
import { blake2b256 } from "../../hash/blake2b256";
import {
	get_minimum_required_balance, get_minimum_required_balance_ergs, create_transaction,
	sign_tx, submit_tx
} from "../../scripts/transactionBuilder";

import { SIGMASTAMP_SERVICE_FEE_AMOUNT } from "../../configs/SigmaStampConfig";

export interface IWallet {
	connected: boolean,
	address: string,
	balance: number
}

const DEFAULT_WALLET_STATE: IWallet = {
	connected: false,
	address: "",
	balance: 0
};


function check_whether_there_is_enough_balance(balance: number): boolean {
	return (balance > get_minimum_required_balance());
}

export function PlaygroundPage() {

	const [wallet, setWallet] = useState<IWallet>(DEFAULT_WALLET_STATE);
	const [file, setFile] = useState<any>(null);
	const [sentTXHash, setSentTXHash] = useState<string>("");

	function stampItButtonHandler() {
		if (file === null) return;
		create_transaction(wallet.address, file.hash).then((tx: any) => {
			sign_tx(tx).then((stx) => {
				if(stx === null){
					alert("Problem during transaction signing, try again!");
					return;
				}
				submit_tx(stx).then((txId) => {
					if(txId === null){
						alert("Submission of transaction into blockchain network failed, try again!");
						return;
					}
					setSentTXHash(txId);
				});
			});
		});
	}

	return (
		<PlaygroundPageDiv>
			<h2>Playground</h2>
			<ErgoConnectorButton wallet={wallet} setWallet={setWallet} />

			{
				(!(wallet.connected)) ?
					<p>Please connect the wallet first</p> :
					(!check_whether_there_is_enough_balance(wallet.balance)) ?
						<p>There is not enough balance for stamping process in your wallet. Required amount is at least {get_minimum_required_balance_ergs()} ERGs.</p> :
						(file === null) ?
							<UploadZone
								onFiles={async (files) => {
									const file = files[0];
									const hash = await blake2b256(file);
									setFile({ file: file, hash: hash });
								}}
								isClickable
							>
								<UploadZoneSigmastampContent>
									Drop the files you want to timestamp here!
								</UploadZoneSigmastampContent>
							</UploadZone> :
							(sentTXHash === "") ?
							<div>
								<p>{file.file.name}</p>
								<p>{file.hash}</p>
								Stamp your file and receive SigmaStampNFT to your address: {wallet.address} by pressing following button:
								<br />
								<button onClick={stampItButtonHandler}>
									Stamp it!
								</button>
							</div> :
							<p>Stamping TX with id {sentTXHash} was successfuly sent!</p>
			}

		</PlaygroundPageDiv>
	);
}

const PlaygroundPageDiv = styled.div``;
