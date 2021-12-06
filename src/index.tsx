import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { FirstCertificatePage } from './pages/FirstCertificate/FirstCertificatePage';
import { BUILD_DATE, BUILD_DETAILS_URL, VERSION } from './config';
import './index.css';
import { SecondCertificatePage } from './pages/SecondCertificate/SecondCertificatePage';

console.info(
    `%c📜 Sigmastamp version ${VERSION}` +
        (!BUILD_DATE ? `` : `\nBuild at ${BUILD_DATE.toLocaleString()}`) +
        (!BUILD_DETAILS_URL
            ? ``
            : `\nView build details ${BUILD_DETAILS_URL.href}`),
    `background: #009EDD; color: white; font-size: 1.1em; font-weight: bold; padding: 5px; border-radius: 3px;`,
);

const HeaderElement = styled.header`
    h1 {
        font-size: 1em;
    }
`;

ReactDOM.render(
    <React.StrictMode>
        <HeaderElement>
            <div id="sigmastamp_heading_div">
                <img
                    className="logo_img"
                    alt="sigmastamp logo"
                    src="sigmastamp_logo.svg"
                />
                <h1>SigmaStamp</h1>
            </div>
        </HeaderElement>

        <HashRouter>
            <Routes>
                <Route path="/" element={<FirstCertificatePage />} />
                <Route path="/verify" element={<SecondCertificatePage />} />
            </Routes>
        </HashRouter>
    </React.StrictMode>,
    document.getElementById('root'),
);
