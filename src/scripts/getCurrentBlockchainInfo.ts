import {
	EXPLORER_URL,
	EXPLORER_BLOKCHAIN_HEIGHT_PREFIX
} from "../configs/blockchainParameters";

export async function getBlockHeight(): Promise<number> {
	const response = await fetch(EXPLORER_URL + EXPLORER_BLOKCHAIN_HEIGHT_PREFIX);
	const body = await response.json();
	return body.items[0].height;
}

//todo - this is only hardcoded value for mocking right now, in the future it will be completly removed
const CURRENT_DIFFICULTY: number = 3186775539318784;

export async function getTotalDifficultyForBlock(block: number): Promise<number> {
	//todo - there will be request for specific explorer/gql api which will provide this number
	//currently there don't exist such an API so we will try to approximate it with the CURRENT_DIFFICULTY
	//for the purpose of testing and based on Ocam's razor (https://en.wikipedia.org/wiki/Occam%27s_razor)
	//it should even be a good approximation (meaning in a good order of magnitude), assuming that
	//ergo blockchain hashrate will not change significantly in a timeline until the totalDifficulty get integrated
	//into the APIs
	return block * CURRENT_DIFFICULTY;
}

export async function getAggregatedDifficultyBetween(stampingBlock: number, currentBlock: number): Promise<number> {
	if (stampingBlock > currentBlock) return 0;//throw "Stamping block cannot be higher number than current block."
	const stampingBlockTotalDiff = await getTotalDifficultyForBlock(stampingBlock-1);
	const currentBlockTotalDiff = await getTotalDifficultyForBlock(currentBlock);
	return currentBlockTotalDiff - stampingBlockTotalDiff;
}

export async function getAggregatedDifficultySinceBlock(block: number): Promise<number> {
	const currentBlock = await getBlockHeight();
	return getAggregatedDifficultyBetween(block, currentBlock);
}
