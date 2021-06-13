import React, { useState } from 'react';
import { UploadZone } from './components/UploadZone';
import styled from 'styled-components';
import { blake2b256 } from './hash/blake2b256';
import {
    getAssetHolders,
    getTransactionTime,
    validateFirstCertificate,
} from './smartcontracts/validateFirstCertificate';
import { PdfPage } from './components/PdfPage';
import JSZip from 'jszip';

export function VerifyApp() {
    const [files, setFiles] = useState<any>([]);
    const [verification, setVerification] = useState<any>(null);

    if (!verification) {
        return (
            <VerifyAppDiv>
                <UploadZone
                    onFiles={async (files) => {
                        const firstCertificate = files[0];
                        setFiles([files[0]]);

                        const verification = await validateFirstCertificate(firstCertificate);

                        if (!verification) {
                            alert(`Your 1st certificate is still not validated through Ergo blockchain.`);
                        }

                        const { txId } = verification;

                        const { timestamp, tokenId } = await getTransactionTime(txId);
                        const hodlers = await getAssetHolders(tokenId);

                        setVerification({ ...verification, timestamp, tokenId, hodlers });
                        console.log(verification);
                    }}
                    clickable
                >
                    Upload your 1st certificate.
                </UploadZone>
            </VerifyAppDiv>
        );
    } else {
        return (
            <PdfPage
                createUi={({ createPdf }) => {
                    return (
                        <button
                            onClick={async () => {
                                const certificateFile = new File(
                                    [await createPdf()],
                                    'certificate2.pdf' /* TODO: Maybe add current {lastModified: 1534584790000}*/,
                                );

                                //saveAs(certificateFile);

                                const zip = new JSZip();
                                for (const file of files) {
                                    zip.file(file.name, file);
                                }
                                zip.file(certificateFile.name, certificateFile);

                                const zipBlob = await zip.generateAsync({ type: 'blob' });

                                const zipHash = await blake2b256(zipBlob);
                                saveAs(zipBlob, `certificate2.${zipHash.substring(0, 5)}.zip`);
                            }}
                        >
                            Create 2nd certificate
                        </button>
                    );
                }}
            >
                <b>txId:</b> {verification.txId}
                <br />
                <b>timestamp:</b> {verification.timestamp}
                <br />
                <b>tokenId:</b> {verification.tokenId}
                <br />
                <b>hodlers:</b> {verification.hodlers.join(', ')}
            </PdfPage>
        );
    }
}

const VerifyAppDiv = styled.div``;
