import React from 'react';
import logo from './logo.svg';
import './App.css';
import { createCertificate } from './pdf/createCertificate';
import { UploadZone } from './components/UploadZone';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button
          onClick={() => { console.log('test'); createCertificate() }}
        >
          Create document
        </button>

        <UploadZone onFiles={(files) => { console.log('files', files) }} >Upload your file(s) here!</UploadZone>
      </header>
    </div>
  );
}

export default App;
