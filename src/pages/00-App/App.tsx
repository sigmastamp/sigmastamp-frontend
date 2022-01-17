import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { Center } from '../../components/Center';
import { ROUTES } from '../../config';
import { FirstCertificatePage } from '../10-FirstCertificate/FirstCertificatePage';
import { SecondCertificatePage } from '../20-SecondCertificate/SecondCertificatePage';
import { BlockchainsPage } from '../50-Blockchains/BlockchainsPage';
import { OraclesPage } from '../53-Oracles/OraclesPage';
import { SampleCertificatesPage } from '../55-SampleCertificates/SampleCertificatesPage';
import { HowItWorksPage } from '../70-HowItWorks/HowItWorksPage';
import { FaqPage } from '../75-Faq/FaqPage';
import { TechnicalStatusPage } from '../80-TechnicalStatus/TechnicalStatusPage';
import { AboutPage } from '../90-About/AboutPage';
import { HeaderComponent } from './HeaderComponent';

export function App() {
    return (
        <AppDiv>
            <HashRouter>
                <div className="menu-column">
                    <HeaderComponent />
                </div>

                <div className="content-column">
                    <MainElement>
                        <Routes>
                            <Route
                                path={ROUTES.FirstCertificate}
                                element={
                                    <Center>
                                        <FirstCertificatePage />
                                    </Center>
                                }
                            />
                            <Route
                                path={ROUTES.SecondCertificate}
                                element={
                                    <Center>
                                        <SecondCertificatePage />
                                    </Center>
                                }
                            />

                            <Route
                                path={ROUTES.Blockchains}
                                element={<BlockchainsPage />}
                            />
                            <Route
                                path={ROUTES.Oracles}
                                element={<OraclesPage />}
                            />
                            <Route
                                path={ROUTES.SampleCertificates}
                                element={<SampleCertificatesPage />}
                            />
                            <Route
                                path={ROUTES.HowItWorks}
                                element={<HowItWorksPage />}
                            />
                            <Route path={ROUTES.Faq} element={<FaqPage />} />
                            <Route
                                path={ROUTES.TechnicalStatus}
                                element={<TechnicalStatusPage />}
                            />

                            <Route
                                path={ROUTES.About}
                                element={<AboutPage />}
                            />
                        </Routes>
                    </MainElement>
                </div>
            </HashRouter>
        </AppDiv>
    );
}

const AppDiv = styled.div`
    --menu-width: calc(20vw + 100px);

    /*/
    border: 1px dashed green; /**/

    .menu-column {
        /*/
        border: 1px dashed red; /**/

        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        width: calc(var(--menu-width) - 20px - 20px);
        padding: 20px;

        background-color: #0000001f;
        box-shadow: #00000047 0px 0px 10px;
        overflow: hidden;
    }

    .content-column {
        /*/
        border: 1px dashed red; /**/

        min-height: 100vh;

        margin-left: var(--menu-width);
        margin-bottom: 100px;
        padding: 20px;
        padding-left: 50px;
    }

    // TODO: Maybe put somewhere else
    a {
        color: #555;
        font-size: 0.7em;
    }
`;

const MainElement = styled.header``;

/**
 * TODO:
 * - !!! Is mobile design layout needed in the first stage ?
 */
