import {
	MIN_NANO_ERGS_IN_BOX, NFT_CREATION_TRANSACTION_MINER_FEE, NANO_ERGS_IN_ONE_ERG
} from "../configs/blockchainParameters";
import {
	SIGMASTAMP_SERVICE_FEE_ADDRESS, SIGMASTAMP_SERVICE_FEE_AMOUNT, SIGMASTAMP_ASSET_TYPE,
	SIGMASTAMP_NFT_DESCRIPTION, SIGMASTAMP_NFT_NAME
} from "../configs/SigmaStampConfig";

import { getBlockHeight } from "./getCurrentBlockchainInfo";

let ergolib = import("ergo-lib-wasm-browser");

export function get_minimum_required_balance(): number {
	return SIGMASTAMP_SERVICE_FEE_AMOUNT + NFT_CREATION_TRANSACTION_MINER_FEE + MIN_NANO_ERGS_IN_BOX;
}

export function get_minimum_required_balance_ergs(): number {
	return get_minimum_required_balance() / NANO_ERGS_IN_ONE_ERG;
}

interface ITxInput {
	boxId: string,
	extension: any
}

interface ITxOutputAsset {
	tokenId: string,
	amount: number
}

interface ITxOutputAssetConverted {
	tokenId: string,
	amount: string
}

interface ITxOutput {
	value: number,
	ergoTree: string,
	assets: ITxOutputAsset[],
	additionalRegisters: any,
	creationHeight: number
}

interface ITxOutputConverted {
	value: string,
	ergoTree: string,
	assets: ITxOutputAssetConverted[],
	additionalRegisters: any,
	creationHeight: number
}

interface ITx {
	inputs: ITxInput[],
	dataInputs: any[],
	outputs: ITxOutput[]
}

interface ITxConverted {
	inputs: ITxInput[],
	dataInputs: any[],
	outputs: ITxOutputConverted[]
}

interface ISignedTxInput {
	boxId: string,
	spendingProof: {
		proofBytes: string,
		extension: any
	}
}

interface ISignedOutput {
	boxId: string,
	value: number,
	ergoTree: string,
	assets: ITxOutputAsset[],
	additionalRegisters: any,
	creationHeight: number,
	transactionId: string,
	index: number
}

interface ISignedTx {
	id: string,
	inputs: ISignedTxInput[]
	dataInputs: any[],
	outputs: ISignedOutput[]
}

export function convert_tx_values_number_to_string(tx: ITx): ITxConverted {
	return {
		...tx, outputs: tx.outputs.map(
			(output: ITxOutput) => convert_utxo_values_number_to_string(output))
	};
}

export function convert_utxo_values_number_to_string(json: ITxOutput): ITxOutputConverted {
	if (json.assets == null) {
		json.assets = [];
	}
	return {
		...json,
		value: json.value.toString(),

		assets: json.assets.map((asset: ITxOutputAsset) => ({
			tokenId: asset.tokenId,
			amount: asset.amount.toString(),
		})),
	};
}

async function get_box_selection(utxos: any) {
	let wasm = await ergolib;

	const selector = new wasm.SimpleBoxSelector();

	return selector.select(
		wasm.ErgoBoxes.from_boxes_json(utxos),
		wasm.BoxValue.from_i64(wasm.I64.from_str(get_minimum_required_balance().toString())),
		new wasm.Tokens()
	);
}

async function get_output_box_candidates(
	user: string, height: number, nftId: string, hash: string// price: number, nanoErgs: number, tokenID: string, height: number
) {

	let wasm = (await ergolib);

	const user_box_value = wasm.BoxValue.from_i64(wasm.I64.from_str(MIN_NANO_ERGS_IN_BOX.toString()));
	const service_fee_value = wasm.BoxValue.from_i64(wasm.I64.from_str((SIGMASTAMP_SERVICE_FEE_AMOUNT).toString()));

	const output_box_candidates = wasm.ErgoBoxCandidates.empty();

	const first_output_builder = new wasm.ErgoBoxCandidateBuilder(
		user_box_value,
		wasm.Contract.pay_to_address(wasm.Address.from_base58(user)),
		height
	);

	const second_output_builder = new wasm.ErgoBoxCandidateBuilder(
		service_fee_value,
		wasm.Contract.pay_to_address(wasm.Address.from_base58(SIGMASTAMP_SERVICE_FEE_ADDRESS)),
		height
	);

	first_output_builder.mint_token(
		new wasm.Token(wasm.TokenId.from_str(nftId), wasm.TokenAmount.from_i64(wasm.I64.from_str("1"))),
		SIGMASTAMP_NFT_NAME,
		SIGMASTAMP_NFT_DESCRIPTION,
		0
	);

	const assetType = wasm.Constant.from_byte_array(Uint8Array.from(Buffer.from(SIGMASTAMP_ASSET_TYPE, "hex")));
	const fileHashValue = wasm.Constant.from_byte_array(Uint8Array.from(Buffer.from(hash, "hex")));

	first_output_builder.set_register_value(7, assetType);
	first_output_builder.set_register_value(8, fileHashValue)
	//todo add remaining register values (R9 - url for verification...)

	output_box_candidates.add(first_output_builder.build());
	output_box_candidates.add(second_output_builder.build());

	return output_box_candidates;
}

export async function create_transaction(
	user: string, hash: string
): Promise<ITxConverted> {

	let wasm = (await ergolib);

	const height = await getBlockHeight();

	if (!ergoConnector || !ergoConnector.nautilus) {
		throw "Ergo connector is required!!!";
	}

	const ctx = await ergoConnector.nautilus.getContext();

	const utxos = await ctx.get_utxos();

	const input_box_selection = await get_box_selection(utxos);
	const first_input_box_id = input_box_selection.boxes().get(0).box_id().to_str();

	const output_box_candidates = await get_output_box_candidates(
		user, height, first_input_box_id, hash
	);

	const miner_fee_value = wasm.BoxValue.from_i64(wasm.I64.from_str((NFT_CREATION_TRANSACTION_MINER_FEE).toString()));
	const min_change_value = wasm.BoxValue.from_i64(wasm.I64.from_str((MIN_NANO_ERGS_IN_BOX).toString()));

	const tx_builder = wasm.TxBuilder.new(
		input_box_selection,
		output_box_candidates,
		height,
		miner_fee_value,
		wasm.Address.from_base58(user),
		min_change_value
	);

	const data_inputs = new wasm.DataInputs();
	tx_builder.set_data_inputs(data_inputs);

	const tx = tx_builder.build().to_json();
	const converted = convert_tx_values_number_to_string(JSON.parse(tx));

	converted.inputs = converted.inputs.map((box: any) => {
		const full_box = utxos.find(utxo => utxo.boxId === box.boxId);
		if (full_box)
			return { ...full_box, extension: {} };
		else return box;
	});

	return converted;
}

export async function sign_tx(unsigned_tx: ITxConverted): Promise<ISignedTx | null> {
	if(!ergoConnector || !ergoConnector.nautilus) return null;
	const ctx: any = await ergoConnector.nautilus.getContext();
	try {
		return ctx.sign_tx(unsigned_tx);
	} catch (_) { return null; }
}

export async function submit_tx(signed_tx: ISignedTx): Promise<string | null> {
	if(!ergoConnector || !ergoConnector.nautilus) return null;
	const ctx: any = await ergoConnector.nautilus.getContext();
	try {
		return ctx.submit_tx(signed_tx);
	} catch (_) { return null; }
}
