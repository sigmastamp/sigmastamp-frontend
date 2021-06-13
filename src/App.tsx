import React from 'react';
import { createCertificate } from './pdf/createCertificate';
import { UploadZone } from './components/UploadZone';
import styled from 'styled-components';


export function App() {
  return (
    <AppDiv>

      {/*
        <button
          onClick={() => { console.log('test'); createCertificate() }}
        >
          Create document
        </button>*/}

      <UploadZone onFiles={(files) => { console.log('files', files) }} clickable>Upload your file(s) here!</UploadZone>

    </AppDiv>
  );
}



const AppDiv = styled.div`



`