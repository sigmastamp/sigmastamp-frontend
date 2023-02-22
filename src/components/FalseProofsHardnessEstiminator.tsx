import { useState, useEffect } from "react";
import { getAggregatedDifficultySinceBlock } from "../scripts/getCurrentBlockchainInfo";

interface IFalseProofHardness {
	loaded: boolean,
	aggregatedDifficulty: number
}

const DEFAULT_FALSE_PROOF_HARDNESS: IFalseProofHardness = {
	loaded: false,
	aggregatedDifficulty: 0
}

//todo fixme move me somewhere outside
// refs https://www.hashrate.no/coins/ERG/benchmarks
// sources for RTX 4070 Ti: https://www.nicehash.com/blog/post/nvidia-rtx-4070-ti-specs-and-mining-hashrate
// this seems to be most efficient card in hashrate/W
const single_card_consumption_kW: number = 0.13;
const single_card_hashrate: number = 134500000; //134.5MH/s
const single_card_name: string = "RTX 4070 Ti";
const electricity_price_usd_per_kWh: number = 0.1;

function calculate_kWh_used_to_achieve_target_difficulty(target_diff: number): number {
	const hours_on_single_card = target_diff / (single_card_hashrate * 3600);
	return hours_on_single_card * single_card_consumption_kW;
}

function calculate_electricity_price_for_kwh(kWh: number): number {
	return kWh * electricity_price_usd_per_kWh;
}

function calculate_electricity_price_to_achieve_target_difficulty(target_diff: number): number {
	return calculate_electricity_price_for_kwh(
		calculate_kWh_used_to_achieve_target_difficulty(target_diff)
	);
}

function get_kWh_in_nice_format(kWh: number): string {
	if (kWh <= 1000) return kWh.toFixed(2) + " kWh";
	else if (kWh <= 1000000) return (kWh / 1000).toFixed(2) + " MWh";
	else if (kWh <= 1000000000) return (kWh / 1000000).toFixed(2) + " GWh";
	else return (kWh / 1000000000).toFixed(2) + " TWh";
}

function get_usd_in_approximated_magnitude_format(usd: number): string {
	if (usd >= 1000000) {
		return "$" + (usd / 1000000).toFixed(2) + " million";
	} else if (usd >= 1000) {
		return "$" + (usd / 1000).toFixed(2) + " thousand";
	} else {
		return "$" + usd.toFixed(2);
	}
}

function get_usd_in_nice_format(usd: number): string {
	let result: string = "$" + usd.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
	result += " (";
	result += get_usd_in_approximated_magnitude_format(usd);
	result += ")";
	return result;
}

export function FalseProofsHardnessEstiminator(props: {
	stampingBlock: number
}) {

	const [hardness, setHardness] = useState<IFalseProofHardness>(DEFAULT_FALSE_PROOF_HARDNESS);
	const [kWh, setkWh] = useState<number>(0.0);

	useEffect(() => {
		setHardness(DEFAULT_FALSE_PROOF_HARDNESS);
		getAggregatedDifficultySinceBlock(props.stampingBlock).then((res) => {
			setkWh(calculate_kWh_used_to_achieve_target_difficulty(res));
			setHardness({ loaded: true, aggregatedDifficulty: res });
		});
	}, [props.stampingBlock]);

	if (!hardness.loaded) {
		return (
			<div>Calculating information about how hard it would be to falsify this stamping proof...</div>
		);
	}

	return (
		<div>To falsify this stamping, it would be required to spend {get_kWh_in_nice_format(kWh)} of electricty, while mining with the most energy efficient cards {single_card_name} for this purpose. This would mean that the falsification cost would be {get_usd_in_nice_format(calculate_electricity_price_for_kwh(kWh))}, assuming the price of {electricity_price_usd_per_kWh} $/kWh.</div>
	);
}
