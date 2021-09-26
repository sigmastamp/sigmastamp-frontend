import {
    ergo_script_address,
    ergo_wallet_address,
    nanoerg,
    seconds,
} from '../interfaces/stringTypes';
import { compileErgoScript } from './compileErgoScript';
import { createScript } from './createScript';
import { getCurrentBlockchainHeight } from './getCurrentBlockchainHeight';
import { isUserAddressCorrect } from './isUserAddressCorrect';
import { sendFollowRequest } from './sendFollowRequest';

interface ICreateSigmaStampNft {
    documentHashInBase64: string;
    documentHashInHex: string;
    userAddress: ergo_wallet_address;
}

export async function createSigmaStampNft({
    userAddress,
    documentHashInBase64,
    documentHashInHex,
}: ICreateSigmaStampNft): Promise<{
    amount: nanoerg;
    address: ergo_script_address;
    dueTime: seconds;
    isPayed(): Promise<boolean>;
}> {
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

    const { address: compiledSmartContractAddress } = await compileErgoScript({
        script,
    });

    const { amount, dueTime, isPayed } = await sendFollowRequest({
        compiledSmartContractAddress,
        userAddress,
        sigmaStampProviderAddress,
        documentHashInHex,
        ergsSendTogetherWithNFT,
        ergsFeeForSigmaStampService,
        mintingFee,
    });

    return {
        amount,
        address: compiledSmartContractAddress,
        dueTime,
        isPayed,
    };
}
