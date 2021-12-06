import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { ROUTES } from '../../config';
import { AboutPage } from '../90-About/AboutPage';
import { FirstCertificatePage } from '../10-FirstCertificate/FirstCertificatePage';
import { OraclesPage } from '../50-Oracles/OraclesPage';
import { SecondCertificatePage } from '../20-SecondCertificate/SecondCertificatePage';
import { HeaderComponent } from './HeaderComponent';
import { MenuComponent } from './MenuComponent';
import { SampleCertificatesPage } from '../55-SampleCertificates/SampleCertificatesPage';

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
                         <Route path={ROUTES.Oracles} element={<OraclesPage />} />
                         <Route path={ROUTES.SampleCertificates} element={<SampleCertificatesPage />} />
                         
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
