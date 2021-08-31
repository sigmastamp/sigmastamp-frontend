import { getCurrentBlockchainHeight } from './getCurrentBlockchainHeight';
import { isUserAddressCorrect } from './isUserAddressCorrect';

interface ICreateSigmaStampNft {
    documentHashInBase64: string;
    documentHashInHex: string;
    userAddress: string;
}

export async function createSigmaStampNft({
    userAddress,
    documentHashInBase64,
    documentHashInHex,
}: ICreateSigmaStampNft) /*: Promise<{ amount: number; address: string }> */ {
    if (!isUserAddressCorrect(userAddress)) {
        throw new Error(`User address "${userAddress}" is not correct.`);
    }

    const mintingFee = 20000000; /* TODO: User settable */
    const ergsSendTogetherWithNFT = 100000000; /* TODO: User settable */
    const ergsFeeForSigmaStampService = 100000000; /* Our fee */
    const sigmaStampProviderAddress =
        '3Ww7y6vi4NhFZ1ufsEF8vQNyGrvhNmeMmDWP9h3s4qSEFSMoGooV';
    const assetTypeValue = 'Ad4=';
    const returnTransactionFee = 10000000;
    const sigmaStampAssemblerNodeAddr =
        '3Ww7y6vi4NhFZ1ufsEF8vQNyGrvhNmeMmDWP9h3s4qSEFSMoGooV';
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
        assetType == fromBase64("${assetTypeValue}") &&
        stampedDocHash == fromBase64("${documentHashInBase64}") &&
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

    const body = JSON.stringify(sourceInScala.trim())
        .split('^\n')
        .join('\n')
        .split('\n\n')
        .join('\n');

    //console.log(sourceInScala, body, bodyx);

    const compilerResponse = await fetch(
        `http://assembler.sigmastamp.ml:14747/compile`,
        {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );
    const compilerResponseBody = await compilerResponse.json();

    const compiledSmartContractAddress = compilerResponseBody.address;
    const ergoAmountRequired =
        ergsSendTogetherWithNFT + ergsFeeForSigmaStampService + mintingFee;
    const documentHashInErgoFormat = `e20${documentHashInHex}`;
    const verifyLinkInErgoFormat = `0e61${
        /* !!! Convert to hex */ `http://sigmastamp.ml/verify?hash=a16d5705c031866f5c5dd1ba39e43538193b45718af5a50a115e1c8d67c209cd`
    }`;

    const requestBody = {
        address: compiledSmartContractAddress,
        returnTo: userAddress,
        startWhen: { erg: ergoAmountRequired },
        txSpec: {
            requests: [
                {
                    ergValue: ergsSendTogetherWithNFT,
                    address: userAddress,
                    name: 'SigmaStampNFT',
                    amount: 1,
                    decimals: 0,
                    description:
                        'Proof of existence of document with Blake2b-256 hash specified in R8 register during minting of this NFT token.',
                    registers: {
                        R7: '0e0201de',
                        R8: documentHashInErgoFormat,
                        R9: verifyLinkInErgoFormat,
                    },
                },
                {
                    value: ergsFeeForSigmaStampService,
                    address: sigmaStampProviderAddress,
                },
            ],
            fee: mintingFee,
            inputs: ['$userIns'],
            dataInputs: [],
        },
    };

    const followResponse = await fetch(
        `http://assembler.sigmastamp.ml:14747/follow`,
        {
            method: 'POST',
            body: JSON.stringify(requestBody),
        },
    );

    const followResponseBody = await followResponse.json();
    const { id, dueTime } = followResponseBody;

    return {
        amount: ergoAmountRequired / 1000000000,
        address: compilerResponseBody.address,
        dueTime,
        async getStatus() {
            // Loop
            const watchResponse = fetch(
                `http://assembler.sigmastamp.ml:14747/result/${id}`,
            );
            const watchResponseBody = await followResponse.json();
            const {
                /*id,*/ tx,
                detail /* pending, returning, mined, success, timeout, returnFailed */,
            } = followResponseBody;

            console.log({ watchResponse, watchResponseBody, tx });

            if (detail === 'success') {
                // !!! And now take tx and create big certificate

                return true;
            }

            return false;
        },
    };
}
