import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../components/Button';
import { PdfPage } from '../../components/PdfPage';
import { UploadZone } from '../../components/UploadZone';
import { ROUTES } from '../../config';
import { blake2b256 } from '../../hash/blake2b256';
import {
    getNFTHolderAddress,
    getTransactionTime,
    validateFirstCertificate,
} from '../../smartcontracts/validateFirstCertificate';

export function SecondCertificatePage() {
    const [files, setFiles] = useState<any>([]);
    const [verification, setVerification] = useState<any>(null);

    if (!verification) {
        return (
            <SecondCertificatePageDiv>
                <UploadZone
                    onFiles={async (droppedFiles) => {
                        const firstCertificate = droppedFiles[0];
                        setFiles([droppedFiles[0]]);

                        const droppedFileVerification =
                            await validateFirstCertificate(firstCertificate);

                        if (!droppedFileVerification) {
                            alert(
                                `Your 1st certificate is still not validated through Ergo blockchain.`,
                            );
                            // TODO @hejny - see comments bellow
                            // TODO - consider skipping the rest because extraction of transactionId from null in
                            // the following statements will result in error
                        }

                        const { transactionId } = droppedFileVerification;

                        const { timestamp, tokenId } = await getTransactionTime(
                            transactionId,
                        );
                        //TODO @hejny @nitram147 - handle null in case that there isn't asset holder
                        //this could happen when somebody burned NFT token
                        //(we know that the corresponding NFT has already existed based on validateFirstCertificate function)
                        //(but we don't know whether it still exists...)
                        const currentHolder = await getNFTHolderAddress(
                            tokenId,
                        );

                        setVerification({
                            ...droppedFileVerification,
                            timestamp,
                            tokenId,
                            currentHolder,
                        });
                        console.log(droppedFileVerification);
                    }}
                    clickable
                >
                    Upload your 1st certificate.
                </UploadZone>
                <Link to={ROUTES.FirstCertificate}>
                    Or create your 1st certificate.
                </Link>
            </SecondCertificatePageDiv>
        );
    } else {
        return (
            <PdfPage
                createUi={({ createPdf }) => {
                    return (
                        <Button
                            onClick={async () => {
                                const certificateFile = new File(
                                    [await createPdf()],
                                    'certificate2.pdf' /* TODO: Maybe add current {lastModified: 1534584790000}*/,
                                );

                                //saveAs(certificateFile);

                                //TODO @hejny @nitram147 - design output format of verify PDF
                                // also show somehow to user what amount of GPUs will be required to remine the chain to make
                                // false proofs - this will be based on the block difficulty since the NFT mining block up to today
                                // TODO @nitram147 - ask on discord whether there's some function on full node to find this difficulty value...
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
                        </Button>
                    );
                }}
            >
                <b>transactionId:</b> {verification.transactionId}
                <br />
                <b>timestamp:</b> {verification.timestamp}
                <br />
                <b>tokenId:</b> {verification.tokenId}
                <br />
                <b>current holder:</b> {verification.currentHolder}
            </PdfPage>
        );
    }
}

const SecondCertificatePageDiv = styled.div``;
