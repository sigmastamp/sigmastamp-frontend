import React from 'react';
import { createCertificate } from './pdf/createCertificate';
import { UploadZone } from './components/UploadZone';
import styled from 'styled-components';
import sha256 from 'crypto-js/hmac-sha256';
import { BLAKE2s } from '@stablelib/blake2s';




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






      }} clickable>Upload your file(s) here!</UploadZone>

    </AppDiv>
  );
}



const AppDiv = styled.div`



`



function uint8Array2hex(uint8Array: Uint8Array) { // buffer is an ArrayBuffer
  return [...uint8Array].map(x => x.toString(16).padStart(2, '0')).join('');
}

async function getAsByteArray(file: File): Promise<Uint8Array> {
  return new Uint8Array(await readFile(file))
}

function readFile(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    // Create file reader
    let reader = new FileReader()

    // Register event listeners
    reader.addEventListener("loadend", event => resolve(event.target!.result as ArrayBuffer))
    reader.addEventListener("error", reject)

    // Read file
    reader.readAsArrayBuffer(file)
  })
}