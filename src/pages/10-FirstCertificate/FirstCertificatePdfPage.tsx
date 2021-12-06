import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import React from 'react';
import { AsyncContentComponent } from '../../components/AsyncContentComponent';
import { IPaymentGateProps } from '../../components/PaymentGate';
import { PdfPage } from '../../components/PdfPage';
import { ORACLES } from '../../config';
import { blake2b256 } from '../../hash/blake2b256';
import { string_base64, string_hex } from '../../interfaces/stringTypes';
import { createSigmaStampNFT } from '../../smartcontracts/createSigmaStampNFT';
import { hexToBase64 } from '../../utils/hexToBase64';

interface IFirstCertificatePdfPageProps {
    files: File[];
    setPayment: (v: IPaymentGateProps) => void;
}

export function FirstCertificatePdfPage(props: IFirstCertificatePdfPageProps) {
    const { files, setPayment } = props;

    return (
        <PdfPage
            createUi={({ createPdf }) => {
                return (
                    <button
                        onClick={async () => {
                            // TODO: !!! Download logic into separate util + setPayment should not be in IFirstCertificatePdfPageProps

                            const certificateFile = new File(
                                [await createPdf()],
                                'certificate1.pdf' /* TODO: Maybe add current {lastModified: 1534584790000}*/,
                            );

                            //saveAs(certificateFile);
                            const zip = new JSZip();
                            for (const file of files) {
                                zip.file(file.name, file);
                            }
                            zip.file(certificateFile.name, certificateFile);

                            const zipBlob = await zip.generateAsync({
                                type: 'blob',
                            });

                            const zipHash: string_hex = await blake2b256(
                                zipBlob,
                            );

                            const zipHashBase64: string_base64 =
                                await hexToBase64(zipHash);

                            saveAs(
                                zipBlob,
                                `certificate1.${zipHash.substring(0, 5)}.zip`,
                            );

                            // TODO: !!! Nicer user input than prompt
                            // TODO @hejny - replace this with custom form (details mentioned in createSigmaStampNFT.ts)
                            // TODO @hejny - also move proof of today function away, so user will be able to decide whether he want to stamp file or he will make special version of file via proof of today page and then he will stamp this proof of today generated zip file (certificate)
                            // but it should be always opt-in, not opt-out !!!
                            const userAddress = prompt(
                                'Please fill your Ergo address',
                                '3Ww7y6vi4NhFZ1ufsEF8vQNyGrvhNmeMmDWP9h3s4qSEFSMoGooV' /* !!! Unhardocde */,
                            );
                            if (!userAddress) {
                                return;
                            }

                            //TODO @hejny - include also page for "return" - this page will be used in case that ergo-assembler failed and users funds got stucked on proxy-smartcontract, see https://sigmausd.io/#/refund <-- we need to implement something like this or the exact "clone" of this...
                            setPayment(
                                await createSigmaStampNFT({
                                    userAddress,
                                    documentHashInBase64: zipHashBase64,
                                    documentHashInHex: zipHash,
                                }),
                            );
                        }}
                    >
                        Download 1st certificate
                    </button>
                );
            }}
        >
            {files.map((file) => (
                <AsyncContentComponent
                    key={file.name}
                    content={async () => {
                        const hash = await blake2b256(file);
                        return (
                            <>
                                <b>Hash of {file.name}</b> is {hash}
                            </>
                        );
                    }}
                />
            ))}

            {ORACLES.map((oracle) => (
                <div key={oracle.name}>
                    <AsyncContentComponent
                        content={async () => {
                            const data = await oracle.getData();

                            return (
                                <>
                                    {Object.entries(data).map(
                                        ([key, value]) => (
                                            <div key={key}>
                                                <b>
                                                    {/* @ts-ignore: Object.entries is dummy and cannot pass propper index signature type */}
                                                    {oracle.title}
                                                    {
                                                        (oracle as any)
                                                            .dataTitles[key]
                                                    }
                                                    :
                                                </b>
                                                {value}
                                            </div>
                                        ),
                                    )}
                                </>
                            );
                        }}
                    />
                </div>
            ))}
        </PdfPage>
    );
}
