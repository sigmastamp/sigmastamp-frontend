import React from 'react';
import { UploadZone } from './components/UploadZone';
import styled from 'styled-components';
//import sha256 from 'crypto-js/hmac-sha256';
import { BLAKE2b } from '@stablelib/blake2b';
import { getAsByteArray } from './utils/getAsByteArray';
import { uint8ArrayToHex } from './utils/uint8ArrayToHex';
import { createCertificate } from './pdf/createCertificate';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { AsyncContentComponent } from './components/AsyncContentComponent';
import { BitcoinOracle } from './oracles/BitcoinOracle';
import { blake2b256 } from './hash/blake2b256';


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

      <UploadZone onFiles={async (files) => {


        const file = files[0];


        const hash = await blake2b256(file);


        console.log({ files, file, hash });

        const certificateFile = createCertificate({ certificateFilename: 'certificate.pdf', hash });

        const zip = new JSZip();
        zip.file(file.name, file);
        zip.file(certificateFile.name, certificateFile);


        const zipFile = await zip.generateAsync({ type: "blob" });
        saveAs(zipFile, "certificate.zip");


      }} clickable>Upload your file(s) here!</UploadZone>

      <AsyncContentComponent content={async () => {


        const bitcoinOracle = new BitcoinOracle();
        return <>Curent BTC hash:{await bitcoinOracle.current()}</>;
      }} />


    </AppDiv>
  );
}



const AppDiv = styled.div`



`




