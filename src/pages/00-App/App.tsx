import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import articleHowItWorks from '../../articles/how-it-works.md';
import { Article } from '../../components/Article';
import { Center } from '../../components/Center';
import { LogoComponent } from '../../components/LogoComponent';
import { VERSION } from '../../config';
import { ROUTES } from '../../routes';
import { VerificationPage } from '../20-VerificationPage/VerificationPage';
import { OraclesPage } from '../53-Oracles/OraclesPage';
import { PlaygroundPage } from '../85-Playground/Playground';
import { MenuComponent } from './MenuComponent';

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
                <header className="darkmode-ignore">
                    <LogoComponent />
                </header>

                <nav className="darkmode-ignore">
                    <MenuComponent wallet={wallet} setWallet={setWallet} />
                </nav>

                <main>
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
                                <Center>
                                    <VerificationPage wallet={wallet} />
                                </Center>
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
                            element={<Article src={articleHowItWorks} />}
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
                </main>

                <footer className="darkmode-ignore">
                    <a href="https://github.com/hejny/rapid-prototyping-wizard/">
                        {VERSION}
                    </a>
                </footer>
            </BrowserRouter>
        </AppDiv>
    );
}

const AppDiv = styled.div`
    /*/
    border: 1px dashed green; /**/

    width: 100%;
    height: 100vh;

    display: grid;

    grid-template-columns: 250px 1fr;
    grid-template-rows: 100px 1fr 50px;
    grid-template-areas:
        '🟥 ⬜'
        '🟦 ⬜'
        '⬛ ⬜';

    align-items: stretch;
    justify-content: stretch;

    @media (max-width: 850px) {
        height: auto;
        min-height: 100vh;

        grid-template-columns: 250px 1fr;
        grid-template-rows: 150px min-content 50px;
        grid-template-areas:
            '🟥 🟦'
            '⬜ ⬜'
            '⬛ ⬛';
    }

    header,
    nav,
    footer {
        background-color: hsl(224, 15%, 15%);
        padding: 10px;
    }

    head,
    nav,
    footer :is(a) {
        color: #eee;
    }

    header {
        grid-area: 🟥;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    nav {
        /*/
        border: 1px dashed red; /**/

        grid-area: 🟦;
        /* TODO: !!! box-shadow: #00000047 0px 0px 10px;*/
        /* TODO: !!!  overflow: hidden; */
    }

    main {
        /*/
        border: 1px dashed red; /**/

        grid-area: ⬜;

        overflow-x: clip;
        overflow-y: scroll;

        padding: 20px;
        padding-left: 50px;
    }

    main h1,
    main h2,
    main h3,
    main h4,
    main h5,
    main h6 {
        margin-top: 40px;
        border-bottom: 1px solid #444;
    }

    footer {
        grid-area: ⬛;

        display: flex;
        align-items: end;
        justify-content: end;
    }

    /*
    !!! Remove
    @media (max-width: 850px) {
        nav {
            position: block;
            z-index: 1;

            width: 100%;
            height: 100px;
            padding: 20px;
        }

        main {
            position: block;
            left: 0;
            padding-top: 200px;
        }
    }
    */
`;

/**
 * TODO: @hejny Document title should be set according to current page
 */
