// import { saveAs } from 'file-saver';
// import JSZip from 'jszip';
import React from 'react';
import { Link } from 'react-router-dom';
// import { Button } from '../../components/Button';
import { PdfPage } from '../../components/PdfPage';
import { UploadZone } from '../../components/UploadZone';
import { UploadZoneSigmastampContent } from '../../components/UploadZoneSigmastampContent';
// import { blake2b256 } from '../../hash/blake2b256';
import { ROUTES } from '../../routes';
import {
    getNFTHolderAddress,
    getTransactionTime,
    validateFirstCertificate,
} from '../../scripts/validateFirstCertificate';
import { FirstAndSecondCertificatePageDiv } from '../10-FirstCertificate/FirstCertificatePage';
import { IWallet } from "../00-App/App";
import { MessageSigner } from "../../components/MessageSigner";
import { get_time_with_timezone_from_timestamp, get_local_date_from_timestamp } from "../../scripts/timeUtils";
import { FalseProofsHardnessEstiminator } from "../../components/FalseProofsHardnessEstiminator";

//todo not only current holder but also show minter address!!!

export function VerificationPage(props: {
    wallet: IWallet
}) {
    // const [files, setFiles] = React.useState<any>([]);
    const [verification, setVerification] = React.useState<any>(null);

    if (!verification || (typeof verification.verificationFailed !== "undefined" )) {
        return (
            <div><span>(Everything will be executed <Link to="/wiki#everything-is-executed-localy" target="_blank" rel="noopener noreferrer">localy</Link>, file is not being send anywhere ;-))</span>
            <br /><br />
            { (verification !== null && typeof verification.verificationFailed !== "undefined") ? <span style={{color: "red"}}>Examined file was not validated (stamped) via SigmaStamp.</span>  : <span></span> }
            <FirstAndSecondCertificatePageDiv>
                <UploadZone
                    onFiles={async (droppedFiles) => {
                        const firstCertificate = droppedFiles[0];
                        // setFiles([droppedFiles[0]]);

                        const droppedFileVerification =
                            await validateFirstCertificate(firstCertificate);

                        if (!droppedFileVerification) {
                            alert(
                                `Examined file was not validated (stamped) via SigmaStamp.`,
                            );
                            // TODO: @hejny <- @nitram147 see comments bellow
                            //       consider skipping the rest because extraction of transactionId from null in
                            //       the following statements will result in error
                            setVerification({verificationFailed: true});
                            return;
                        }

                        const { transactionId } = droppedFileVerification;
                        const { settlementHeight } = droppedFileVerification;
                        const stamperAddress: string = droppedFileVerification.address;

                        const { timestamp, tokenId } = await getTransactionTime(
                            transactionId,
                        );
                        // TODO: @nitram147 -> @hejny <- @nitram147 handle null in case that there isn't asset holder
                        // this could happen when somebody burned NFT token
                        // (we know that the corresponding NFT has already existed based on validateFirstCertificate function)
                        // (but we don't know whether it still exists...)
                        const currentHolder = await getNFTHolderAddress(
                            tokenId,
                        );

                        setVerification({
                            ...droppedFileVerification,
                            timestamp,
                            tokenId,
                            stamperAddress,
                            currentHolder,
                            settlementHeight
                        });
                        console.log(droppedFileVerification);
                    }}
                    isClickable
                >
                    <UploadZoneSigmastampContent>
                        Drop your file here to verify it.
                    </UploadZoneSigmastampContent>
                </UploadZone>
                <Link to={ROUTES.Playground}>
                    Or stamp your file here.
                </Link>
            </FirstAndSecondCertificatePageDiv></div>
        );
    } else {
        return (
            <div>
                <PdfPage
                    renderUi={({ createPdf }) => {
                        return (
                            /*<Button
                                onClick={async () => {
                                    const certificateFile = new File(
                                        [await createPdf()],
                                        'certificate2.pdf', // TODO: Maybe add current {lastModified: 1534584790000},
                                    );

                                    //saveAs(certificateFile);

                                    //TODO: @nitram147 -> @hejny <- @nitram147 design output format of verify PDF
                                    // also show somehow to user what amount of GPUs will be required to remine the chain to make
                                    // false proofs - this will be based on the block difficulty since the NFT mining block up to today
                                    // TODO: @nitram147 - ask on discord whether there's some function on full node to find this difficulty value...
                                    const zip = new JSZip();
                                    for (const file of files) {
                                        zip.file(file.name, file);
                                    }
                                    zip.file(certificateFile.name, certificateFile);

                                    const zipBlob = await zip.generateAsync({
                                        type: 'blob',
                                    });

                                    const zipHash = await blake2b256(zipBlob);
                                    saveAs(
                                        zipBlob,
                                        `certificate2.${zipHash.substring(
                                            0,
                                            5,
                                        )}.zip`,
                                    );
                                }}
                            >
                                Download 2nd certificate
                            </Button>*/
                            <span></span>//just dummy span
                        );
                    }}
                >
                    <b>Stamped in transaction with ID:</b> {verification.transactionId}
                    <br />
                    <b>Transaction was mined at height:</b> {verification.settlementHeight}
                    <br />
                    <b>Mined at UnixTimestamp:</b> {verification.timestamp}
                    <br />
                    <b>Mined at date:</b> {get_local_date_from_timestamp(verification.timestamp)}
                    <br />
                    <b>Mined at time:</b> {get_time_with_timezone_from_timestamp(verification.timestamp)}
                    <br />
                    <b>Stamping tokenId:</b> {verification.tokenId}
                    <br />
                    <b>Stamper address:</b> {verification.stamperAddress}
                    <br />
                    <b>Current holder of stamping NFT token:</b> {verification.currentHolder}
                    <br />
                </PdfPage>
                <FalseProofsHardnessEstiminator stampingBlock={verification.settlementHeight} />
                <MessageSigner wallet={props.wallet} stamperAddress={verification.stamperAddress} holderAddress={verification.currentHolder} />
            </div>
        );
    }
}

/**
 * TODO: @hejny When the user is in the middle of the process, prevent unloading of the page (or the component) by "unsubmitted form" feature of the browser
 */
