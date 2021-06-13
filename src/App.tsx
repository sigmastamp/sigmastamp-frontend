import React, { useState } from 'react';
import { UploadZone } from './components/UploadZone';
import styled from 'styled-components';
import { createCertificate } from './pdf/createCertificate';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { AsyncContentComponent } from './components/AsyncContentComponent';
import { BitcoinOracle } from './oracles/BitcoinOracle';
import { blake2b256 } from './hash/blake2b256';
import { EthereumOracle } from './oracles/EthereumOracle';
import { LitecoinOracle } from './oracles/LitecoinOracle';
import { DateOracle } from './oracles/DateOracle';
import { NytimesOracle } from './oracles/NytimesOracle';
// @ts-ignore: no typings
import html2pdf from 'html2pdf.js';
import html2canvas from 'html2canvas';
import { PdfPage } from './components/PdfPage';

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
                                        'certificate.pdf' /* TODO: Maybe add current {lastModified: 1534584790000}*/,
                                    );

                                    saveAs(certificateFile);
                                    return;

                                    const zip = new JSZip();
                                    for (const file of state.files) {
                                        zip.file(file.name, file);
                                    }
                                    zip.file(certificateFile.name, certificateFile);

                                    const zipFile = await zip.generateAsync({ type: 'blob' });
                                    saveAs(zipFile, 'certificate.zip');
                                }}
                            >
                                Generate PDF
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
                                            {Object.entries(data).map(([key, value]) => (
                                                <div key={key}>
                                                    <b>
                                                        {/* @ts-ignore: Object.entries is dummy and cannot pass propper index signature type */}
                                                        {oracle.title} {oracle.dataTitles[key]}:
                                                    </b>{' '}
                                                    {value}
                                                </div>
                                            ))}
                                        </>
                                    );
                                }}
                            />
                        </div>
                    ))}
                </PdfPage>
            )}
        </AppDiv>
    );
}

const AppDiv = styled.div``;
