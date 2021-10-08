import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AsyncContentComponent } from './components/AsyncContentComponent';
import { IPaymentGateProps, PaymentGate } from './components/PaymentGate';
import { PdfPage } from './components/PdfPage';
import { UploadZone } from './components/UploadZone';
import { blake2b256 } from './hash/blake2b256';
import { string_base64, string_hex } from './interfaces/stringTypes';
import { BitcoinOracle } from './oracles/BitcoinOracle';
import { DateOracle } from './oracles/DateOracle';
import { EthereumOracle } from './oracles/EthereumOracle';
import { LitecoinOracle } from './oracles/LitecoinOracle';
import { NytimesOracle } from './oracles/NytimesOracle';
import { createSigmaStampNft } from './smartcontracts/createSigmaStampNft';
import { hexToBase64 } from './utils/hexToBase64';

const ORACLES = [
    new BitcoinOracle(),
    new EthereumOracle(),
    new LitecoinOracle(),
    new DateOracle(),
    new NytimesOracle(),
];

interface IAppState {
    files: File[];
}

export function App() {
    const [state, setState] = useState<IAppState>({ files: [] });
    const [payment, setPayment] = useState<null | IPaymentGateProps>(null);

    if (!payment) {
        return (
            <AppDiv>
                {/*
        <button
          onClick={() => { console.log('test'); createCertificate() }}
        >
          Create document
        </button>
            <h1>Sigmastamp</h1>*/}

                {state.files.length === 0 ? (
                    <UploadZone
                        onFiles={async (files) => {
                            setState({ files });
                            /*
                    const file = files[0];

                    const hash = await blake2b256(file);

                    console.log({ files, file, hash });

                    const certificateFile = createCertificate({ certificateFilename: 'certificate.pdf', hash });

                    const zip = new JSZip();
                    zip.file(file.name, file);
                    zip.file(certificateFile.name, certificateFile);

                    const zipFile = await zip.generateAsync({ type: 'blob' });
                    saveAs(zipFile, 'certificate.zip');
                    */
                        }}
                        clickable
                    >
                        Upload your file(s) here!
                    </UploadZone>
                ) : (
                    <PdfPage
                        createUi={({ createPdf }) => {
                            return (
                                <button
                                    onClick={async () => {
                                        const certificateFile = new File(
                                            [await createPdf()],
                                            'certificate1.pdf' /* TODO: Maybe add current {lastModified: 1534584790000}*/,
                                        );

                                        //saveAs(certificateFile);

                                        const zip = new JSZip();
                                        for (const file of state.files) {
                                            zip.file(file.name, file);
                                        }
                                        zip.file(
                                            certificateFile.name,
                                            certificateFile,
                                        );

                                        const zipBlob = await zip.generateAsync(
                                            { type: 'blob' },
                                        );

                                        const zipHash: string_hex =
                                            await blake2b256(zipBlob);

                                        const zipHashBase64: string_base64 =
                                            await hexToBase64(zipHash);

                                        saveAs(
                                            zipBlob,
                                            `certificate1.${zipHash.substring(
                                                0,
                                                5,
                                            )}.zip`,
                                        );

                                        // TODO: !!! Nicer user input than prompt
                                        const userAddress = prompt(
                                            'Please fill your Ergo address',
                                            '3Ww7y6vi4NhFZ1ufsEF8vQNyGrvhNmeMmDWP9h3s4qSEFSMoGooV' /* !!! Unhardocde */,
                                        );
                                        if (!userAddress) {
                                            return;
                                        }

                                        setPayment(
                                            await createSigmaStampNft({
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
                        {state.files.map((file) => (
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
                                                                    (
                                                                        oracle as any
                                                                    )
                                                                        .dataTitles[
                                                                        key
                                                                    ]
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
                )}

                <Link to="/verify" target={'_blank'}>
                    Or verify your 1st certificate.
                </Link>

                <Link to="/about">
                    TODO: !!! Short information about Sigmastamp, version and the build (leading to the more detailed information)
                </Link>
            </AppDiv>
        );
    } else {
        return <PaymentGate {...payment} />;
    }
}

const AppDiv = styled.div`
    a {
        color: #555;
        font-size: 0.7em;
    }
`;
