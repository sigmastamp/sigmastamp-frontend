import React from 'react';
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

const ORACLES = [
    new BitcoinOracle(),
    new EthereumOracle(),
    new LitecoinOracle(),
    new DateOracle(),
    new NytimesOracle(),
];

export function App() {
    return (
        <AppDiv>
            {/*
        <button
          onClick={() => { console.log('test'); createCertificate() }}
        >
          Create document
        </button>*/}
            <h1>Sigmastamp</h1>

            <UploadZone
                onFiles={async (files) => {
                    const file = files[0];

                    const hash = await blake2b256(file);

                    console.log({ files, file, hash });

                    const certificateFile = createCertificate({ certificateFilename: 'certificate.pdf', hash });

                    const zip = new JSZip();
                    zip.file(file.name, file);
                    zip.file(certificateFile.name, certificateFile);

                    const zipFile = await zip.generateAsync({ type: 'blob' });
                    saveAs(zipFile, 'certificate.zip');
                }}
                clickable
            >
                Upload your file(s) here!
            </UploadZone>

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
        </AppDiv>
    );
}

const AppDiv = styled.div``;
