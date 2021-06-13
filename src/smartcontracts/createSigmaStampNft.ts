import { getCurrentBlockchainHeight } from "./getCurrentBlockchainHeight";
import { isUserAddressCorrect } from "./isUserAddressCorrect";

interface ICreateSigmaStampNft {
    /* base64 */
    documentHash: string;

    userAddress: string;
}

export async function createSigmaStampNft({ userAddress, documentHash }: ICreateSigmaStampNft): Promise<string> {
    if (!isUserAddressCorrect(userAddress)) {
        throw new Error(`User address "${userAddress}" is not correct.`);
    }

    const ergsSendTogetherWithNFT = 0.1; /* TODO: User settable */
    const ergsFeeForSigmaStampService = 0.1; /* Our fee */
    const sigmaStampProviderAddress = '3Ww7y6vi4NhFZ1ufsEF8vQNyGrvhNmeMmDWP9h3s4qSEFSMoGooV';
    const assetTypeValue = 'Ad4=';
    const returnTransactionFee = 10000000;
    const sigmaStampAssemblerNodeAddr = '3Ww7y6vi4NhFZ1ufsEF8vQNyGrvhNmeMmDWP9h3s4qSEFSMoGooV';
    const refundHeightThreshold = (await getCurrentBlockchainHeight()) + 10;

    const sourceInScala = `
    {

        val sigmaStampNftIssuanceOK = {
            
            val assetType = OUTPUTS(0).R7[Coll[Byte]].get
            val stampedDocHash = OUTPUTS(0).R8[Coll[Byte]].get
            val issued = OUTPUTS(0).tokens.getOrElse(0, (INPUTS(0).id, 0L))
    
            INPUTS(0).id == issued._1 && issued._2 == 1 &&
            OUTPUTS(0).value == ${ergsSendTogetherWithNFT}L &&
    
            OUTPUTS(0).propositionBytes == PK("${userAddress}").propBytes &&
            OUTPUTS(1).value == ${ergsFeeForSigmaStampService}L &&
    
            OUTPUTS(1).propositionBytes == PK("${sigmaStampProviderAddress}").propBytes &&
            assetType == fromBase64(${assetTypeValue}) &&
            stampedDocHash == fromBase64(${documentHash}) &&
            OUTPUTS.size == 3
    
        }
    
        val returnFunds = {
    
            val total_without_fee = INPUTS.fold(0L, {(x:Long, b:Box) => x + b.value}) - ${returnTransactionFee}L
    
            OUTPUTS(0).value >= total_without_fee &&
            OUTPUTS(0).propositionBytes == PK("${userAddress}").propBytes &&
            (PK("${sigmaStampAssemblerNodeAddr}") || HEIGHT > ${refundHeightThreshold}) &&
            OUTPUTS.size == 2
    
        }
    
        sigmaProp(sigmaStampNftIssuanceOK || returnFunds)
    
    }
    `;
}
