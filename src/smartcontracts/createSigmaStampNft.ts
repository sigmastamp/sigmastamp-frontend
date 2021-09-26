import { ERGO_ASSEMBLER_URL } from '../config';
import { ergo_wallet_address } from '../interfaces/stringTypes';
import { compileErgoScript } from './compileErgoScript';
import { createScript } from './createScript';
import { getCurrentBlockchainHeight } from './getCurrentBlockchainHeight';
import { isUserAddressCorrect } from './isUserAddressCorrect';

interface ICreateSigmaStampNft {
    documentHashInBase64: string;
    documentHashInHex: string;
    userAddress: ergo_wallet_address;
}

/**
 *
 * TODO: !!! Split into more granular pieces
 */
export async function createSigmaStampNft({
    userAddress,
    documentHashInBase64,
    documentHashInHex,
}: ICreateSigmaStampNft) /*: Promise<{ amount: number; address: string }> */ {
    if (!(await isUserAddressCorrect(userAddress))) {
        throw new Error(`User address "${userAddress}" is not correct.`);
    }

    const mintingFee = 20000000; /* TODO: User settable */
    const ergsSendTogetherWithNFT = 100000000; /* TODO: User settable */
    const ergsFeeForSigmaStampService = 100000000; /* Our fee */
    const sigmaStampProviderAddress =
        '3Ww7y6vi4NhFZ1ufsEF8vQNyGrvhNmeMmDWP9h3s4qSEFSMoGooV';
    const assetTypeValue = 'Ad4=';
    const returnTransactionFee = 10000000;

    /**
     * TODO: !!! unhardcode address
     */
    const sigmaStampAssemblerNodeAddr =
        '3Ww7y6vi4NhFZ1ufsEF8vQNyGrvhNmeMmDWP9h3s4qSEFSMoGooV';
    const refundHeightThreshold = (await getCurrentBlockchainHeight()) + 10;

    console.log(
        JSON.stringify({
            ergsSendTogetherWithNFT,
            userAddress,
            ergsFeeForSigmaStampService,
            sigmaStampProviderAddress,
            assetTypeValue,
            documentHashInBase64,
            returnTransactionFee,
            sigmaStampAssemblerNodeAddr,
            refundHeightThreshold,
        }),
    );

    const { script } = await createScript({
        script: '/scripts/sigmastamp-nft.scala',

        // TODO: Better names for variabiles below (replace everywhere in scala script + here):
        ergsSendTogetherWithNFT,
        userAddress,
        ergsFeeForSigmaStampService,
        sigmaStampProviderAddress,
        assetTypeValue,
        documentHashInBase64,
        returnTransactionFee,
        sigmaStampAssemblerNodeAddr,
        refundHeightThreshold,
    });

    // console.log(script);
    const { address: compiledSmartContractAddress } = await compileErgoScript({
        script,
    });

    const ergoAmountRequired =
        ergsSendTogetherWithNFT + ergsFeeForSigmaStampService + mintingFee;
    const documentHashInErgoFormat = `e20${documentHashInHex}`;
    const verifyLinkInErgoFormat = `0e61${
        /* !!! Convert to hex */ `http://sigmastamp.ml/verify?hash=a16d5705c031866f5c5dd1ba39e43538193b45718af5a50a115e1c8d67c209cd`
    }`;

    // TODO: !!! Separate function for follow
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

    const followResponse = await fetch(`${ERGO_ASSEMBLER_URL.href}/follow`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    });

    const followResponseBody = await followResponse.json();
    const { id, dueTime } = followResponseBody;

    return {
        amount: ergoAmountRequired / 1000000000,
        address: compiledSmartContractAddress,
        dueTime,
        async getStatus() {
            // Loop
            const watchResponse = fetch(
                `${ERGO_ASSEMBLER_URL.href}/result/${id}`,
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
