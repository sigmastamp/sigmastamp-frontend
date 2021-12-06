import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { ROUTES } from '../../config';
import { AboutPage } from '../About/AboutPage';
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
                        <Route
                            path={ROUTES.FirstCertificate}
                            element={<FirstCertificatePage />}
                        />
                        <Route
                            path={ROUTES.SecondCertificate}
                            element={<SecondCertificatePage />}
                        />
                        <Route path={ROUTES.About} element={<AboutPage />} />
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
