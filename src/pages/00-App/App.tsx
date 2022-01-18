import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { Center } from '../../components/Center';
import { ROUTES } from '../../routes';
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
            <BrowserRouter>
                <div className="menu-column">
                    <HeaderComponent />
                </div>

                <div className="content-column">
                    <main>
                        <Center>
                            <Routes>
                                <Route
                                    path={ROUTES.FirstCertificate}
                                    element={<FirstCertificatePage />}
                                />
                                <Route
                                    path={ROUTES.SecondCertificate}
                                    element={<SecondCertificatePage />}
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
                                <Route
                                    path={ROUTES.Faq}
                                    element={<FaqPage />}
                                />
                                <Route
                                    path={ROUTES.TechnicalStatus}
                                    element={<TechnicalStatusPage />}
                                />

                                <Route
                                    path={ROUTES.About}
                                    element={<AboutPage />}
                                />
                            </Routes>
                        </Center>
                    </main>
                </div>
            </BrowserRouter>
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

        background-color: hsl(224, 15%, 15%);
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

    .content-column a {
        color: #eee;
    }

    .content-column h1,
    .content-column h2,
    .content-column h3,
    .content-column h4,
    .content-column h5,
    .content-column h6 {
        margin-top: 40px;
        border-bottom: 1px solid #444;
    }

    @media (max-width: 850px) {
        .menu-column {
            position: block;
            z-index: 1;

            width: 100%;
            height: 100px;
            padding: 20px;
        }

        .content-column {
            position: block;
            margin-left: 0;
            padding-top: 200px;
        }
    }
`;

/**
 * TODO: @hejny Document title should be set according to current page
 */
