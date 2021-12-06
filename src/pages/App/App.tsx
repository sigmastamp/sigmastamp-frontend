import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { FirstCertificatePage } from '../FirstCertificate/FirstCertificatePage';
import { SecondCertificatePage } from '../SecondCertificate/SecondCertificatePage';
import { HeaderComponent } from './HeaderComponent';
import { MenuComponent } from './MenuComponent';

export function App() {
    return (
        <AppDiv>
            <HashRouter>
                <HeaderComponent />
                <MenuComponent />
                <MainElement>
                    <Routes>
                        <Route path="/" element={<FirstCertificatePage />} />
                        <Route
                            path="/verify"
                            element={<SecondCertificatePage />}
                        />
                    </Routes>
                </MainElement>
            </HashRouter>
        </AppDiv>
    );
}

const AppDiv = styled.div`
    a {
        color: #555;
        font-size: 0.7em;
    }
`;

const MainElement = styled.header``;
