import { IPaymentStatus } from '../interfaces/IPaymentStatus';
import {
    ergo_script_address,
    ergo_wallet_address,
    nanoerg,
} from '../interfaces/stringTypes';
import { isUserAddressValid } from './addressValidator';
import { compileErgoScript } from './compileErgoScript';
import { createScript } from './createScript';
import { getCurrentBlockchainHeight } from './getCurrentBlockchainInfo';
import { sendFollowRequest } from './sendFollowRequest';

interface ICreateSigmaStampNFT {
    documentHashInBase64: string;
    documentHashInHex: string;
    userAddress: ergo_wallet_address;
}

export async function createSigmaStampNFT({
    userAddress,
    documentHashInBase64,
    documentHashInHex,
}: ICreateSigmaStampNFT): Promise<{
    amount: nanoerg;
    address: ergo_script_address;
    dueDate: Date;
    paymentStatus: IPaymentStatus;
}> {
    if (!(await isUserAddressValid(userAddress))) {
        throw new Error(`User address "${userAddress}" is not correct.`);
    }

    //TODO: @nitram147 -> @hejny validate whether hash already exists in blockchain (same way as in the verification phase)
    //if hash exists there, show user warning that this file was already stamped via sigmastamp and cannot be done more times
    //[of couse somebody can stamp this file again on its own, however will we be taking into account only the first occurence of this hash in blockchain - so the guy who stamped it first is the original owner of the file]

    //TODO: use getCurrentBlockchainMinFeeRequired to get current min fee
    //allow user to set multiples of this value to increase/decrease minting priority
    //TODO: @nitram147 -> @hejny design custom form in which user will setup:
    // 1.) user's address
    // 2.) how fast he want to have his NFT to be minted (in multiples of minimum fee - see comment above)
    // 3.) user could show hidden advanced setting which will include:
    //     a.) setup of custom amount of ERG to send together with NFT token (so user will be able to transfer NFT in future ERG amount sent together with NFT will be used to cover transaction fees on ergo network)
    //         there should be also tooltip (like question mark icon) which will include explanation text (which will explain what this ERG amount mean...)
    //TODO: @nitram147 -> @nitram147 -> @hejny think about stamping service fee... (whether to make it stable or based on current erg price etc.)
    const mintingFee = 20000000; /* TODO: User settable */
    const ergsSendTogetherWithNFT = 100000000; /* TODO: User settable */
    const ergsFeeForSigmaStampService = 100000000; /* Our fee */
    //TODO: @nitram147 -> @hejny move harcoded values into some config file
    const sigmaStampProviderAddress =
        '3Ww7y6vi4NhFZ1ufsEF8vQNyGrvhNmeMmDWP9h3s4qSEFSMoGooV';
    const assetTypeValue = 'Ad4=';
    //TODO: @nitram147 - redesign this fee also to use getCurrentBlockchainMinFeeRequired function...
    const returnTransactionFee = 10000000;

    /**
     * TODO: !!! unhardcode address
     */
    // TODO: @nitram147 -> @hejny move it also to some configuration...
    const sigmaStampAssemblerNodeAddr =
        '3Ww7y6vi4NhFZ1ufsEF8vQNyGrvhNmeMmDWP9h3s4qSEFSMoGooV';
    // TODO: @nitram147 -> @hejny same - move the value of "10" bellow to the config file
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

    const { amount, dueDate, paymentStatus } = await sendFollowRequest({
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
        dueDate,
        paymentStatus,
    };
}
