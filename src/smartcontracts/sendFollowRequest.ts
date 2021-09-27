import { ERGO_ASSEMBLER_URL } from '../config';
import {
    ergo_script_address,
    ergo_wallet_address,
    nanoerg,
    seconds,
    string_hex,
} from '../interfaces/stringTypes';
import { hexToErgoFormat } from './ergoFormat/hexToErgoFormat';
import { urlToErgoFormat } from './ergoFormat/urlToErgoFormat';

/**
 * TODO: !!! Probbably rename to something like followPaymentRequest
 */
export async function sendFollowRequest({
    compiledSmartContractAddress,
    userAddress,
    sigmaStampProviderAddress,
    documentHashInHex,
    ergsSendTogetherWithNFT,
    ergsFeeForSigmaStampService,
    mintingFee,
}: {
    compiledSmartContractAddress: ergo_script_address;
    userAddress: ergo_wallet_address;
    /**
     * TODO: !!! Is it ergo_script_address OR ergo_wallet_address
     */
    sigmaStampProviderAddress: ergo_script_address;
    documentHashInHex: string_hex;
    ergsSendTogetherWithNFT: nanoerg;
    ergsFeeForSigmaStampService: nanoerg;
    mintingFee: nanoerg;
}): Promise<{
    amount: nanoerg;
    dueTime: seconds /* TODO: is it really seconds */;

    /**
     * TODO: !!! Probbably do with some RxJS array to the consumer
     */
    isPayed(): Promise<boolean>;
}> {
    const amount: nanoerg =
        ergsSendTogetherWithNFT + ergsFeeForSigmaStampService + mintingFee;

    const requestBody = {
        address: compiledSmartContractAddress,
        returnTo: userAddress,
        startWhen: { erg: amount },
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
                        R8: hexToErgoFormat(documentHashInHex),
                        R9: urlToErgoFormat(
                            // TODO: !!! unhardcode address (What hash there should be Is it documentHashInHex)
                            `http://sigmastamp.ml/verify?hash=a16d5705c031866f5c5dd1ba39e43538193b45718af5a50a115e1c8d67c209cd`,
                        ),
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

    const followResponse = await fetch(`${ERGO_ASSEMBLER_URL.href}follow`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    });

    const followResponseBody = await followResponse.json();
    const { id: transactionId, dueTime } = followResponseBody;

    return {
        amount,
        dueTime,
        async isPayed() {
            // Loop
            const watchResponse = fetch(
                `${ERGO_ASSEMBLER_URL.href}result/${transactionId}`,
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
