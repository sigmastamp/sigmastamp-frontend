import React from 'react';
import { UploadZone } from './components/UploadZone';
import styled from 'styled-components';
//import sha256 from 'crypto-js/hmac-sha256';
import { BLAKE2s } from '@stablelib/blake2s';
import { getAsByteArray } from './utils/getAsByteArray';
import { uint8Array2hex } from './utils/uint8Array2hex';
import { createCertificate } from './pdf/createCertificate';




export function App() {
  return (
    <AppDiv>

      {/*
        <button
          onClick={() => { console.log('test'); createCertificate() }}
        >
          Create document
        </button>*/}

      <UploadZone onFiles={async (files) => {


        const file = files[0];
        //const sha256hmac = sha256('aaa', 'aaa');

        const blake2s = new BLAKE2s();
        blake2s.update(await getAsByteArray(file)/* new Uint8Array(2); */);


        const hash = uint8Array2hex(blake2s.digest());


        console.log({ files, file, hash });


        createCertificate({ hash });



      }} clickable>Upload your file(s) here!</UploadZone>

    </AppDiv>
  );
}



const AppDiv = styled.div`



`




