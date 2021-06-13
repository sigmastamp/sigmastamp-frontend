import React from 'react';
import { UploadZone } from './components/UploadZone';
import styled from 'styled-components';
//import sha256 from 'crypto-js/hmac-sha256';
import { BLAKE2b } from '@stablelib/blake2b';
import { getAsByteArray } from './utils/getAsByteArray';
import { uint8Array2hex } from './utils/uint8Array2hex';
import { createCertificate } from './pdf/createCertificate';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { AsyncContentComponent } from './components/AsyncContentComponent';
import { BitcoinOracle } from './oracles/BitcoinOracle';


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
        //const sha256hmac = sha256('aaa', 'aaa');

        const blake2b = new BLAKE2b();
        blake2b.digestLength = 32;
        blake2b.update(await getAsByteArray(file)/* new Uint8Array(2); */);


        const hash = uint8Array2hex(blake2b.digest());


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
        return <>{await bitcoinOracle.current()}</>;
      }} />


    </AppDiv>
  );
}



const AppDiv = styled.div`



`




