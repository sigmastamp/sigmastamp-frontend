import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import articleHowItWorks from '../../articles/how-it-works.md';
import { Article } from '../../components/Article';
import { Center } from '../../components/Center';
import { ROUTES } from '../../routes';
import { VerificationPage } from '../20-VerificationPage/VerificationPage';
import { OraclesPage } from '../53-Oracles/OraclesPage';
import { PlaygroundPage } from '../85-Playground/Playground';
import { HeaderComponent } from './HeaderComponent';

console.log({ articleHowItWorks });

export interface IWallet {
    connected: boolean;
    address: string;
    balance: number;
}

const DEFAULT_WALLET_STATE: IWallet = {
    connected: false,
    address: '',
    balance: 0,
};

export function App() {
    const [wallet, setWallet] = useState<IWallet>(DEFAULT_WALLET_STATE);

    return (
        <AppDiv>
            <BrowserRouter>
                <div className="menu-section">
                    <HeaderComponent wallet={wallet} setWallet={setWallet} />
                </div>

                <div className="content-section">
                    <main>
                        <Center>
                            <Routes>
                                {/*<Route
                                    path={ROUTES.FirstCertificate}
                                    element={<FirstCertificatePage />}
                                />*/}
                                <Route
                                    path={'/'}
                                    element={<PlaygroundPage wallet={wallet} />}
                                />
                                <Route
                                    path={ROUTES.VerificationPage}
                                    element={
                                        <VerificationPage wallet={wallet} />
                                    }
                                />

                                {/*<Route
                                    path={ROUTES.Blockchains}
                                    element={<BlockchainsPage />}
                                />*/}
                                <Route
                                    path={ROUTES.Oracles}
                                    element={<OraclesPage />}
                                />
                                {/*<Route
                                    path={ROUTES.SampleCertificates}
                                    element={<SampleCertificatesPage />}
                                />*/}
                                <Route
                                    path={ROUTES.HowItWorks}
                                    element={
                                        <Article src={articleHowItWorks} />
                                    }
                                />
                                {/*<Route
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
                                />*/}

                                <Route
                                    path={ROUTES.Playground}
                                    element={<PlaygroundPage wallet={wallet} />}
                                />
                            </Routes>
                        </Center>
                    </main>
                </div>

                {/*
                <div className="footer-section">
                    <a href="https://github.com/hejny/rapid-prototyping-wizard/">
                        {VERSION}
                    </a>
                </div>
                */}
            </BrowserRouter>
        </AppDiv>
    );
}

const AppDiv = styled.div`
    --menu-width: calc(20vw + 100px);

    /*/
    border: 1px dashed green; /**/

    .menu-section {
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

    .content-section {
        /*/
        border: 1px dashed red; /**/

        position: absolute;
        top: 0;
        left: var(--menu-width);
        right: 0;

        min-height: 100vh;

        overflow-x: clip;
        overflow-y: visible;

        padding: 20px;
        padding-left: 50px;
    }

    .content-section a {
        color: #eee;
    }

    .content-section h1,
    .content-section h2,
    .content-section h3,
    .content-section h4,
    .content-section h5,
    .content-section h6 {
        margin-top: 40px;
        border-bottom: 1px solid #444;
    }

    @media (max-width: 850px) {
        .menu-section {
            position: block;
            z-index: 1;

            width: 100%;
            height: 100px;
            padding: 20px;
        }

        .content-section {
            position: block;
            left: 0;
            padding-top: 200px;
        }
    }
`;

/**
 * TODO: @hejny Document title should be set according to current page
 */
