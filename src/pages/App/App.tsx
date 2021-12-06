import React from 'react';
import { HashRouter, Link, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { FirstCertificatePage } from '../FirstCertificate/FirstCertificatePage';
import { SecondCertificatePage } from '../SecondCertificate/SecondCertificatePage';

export function App() {
    return (
        <AppDiv>
            <HashRouter>
                <Header>
                    <div id="sigmastamp_heading_div">
                        <img
                            className="logo_img"
                            alt="sigmastamp logo"
                            src="sigmastamp_logo.svg"
                        />
                        <h1>SigmaStamp</h1>
                    </div>
                </Header>

                <Menu>
                    <ul>
                        <li>
                            <Link to="/verify">
                                Or verify your 1st certificate.
                            </Link>
                        </li>
                        <li>
                            <Link to="/about">
                                TODO: !!! Short information about Sigmastamp,
                                version and the build (leading to the more
                                detailed information)
                            </Link>
                        </li>
                    </ul>
                </Menu>

                <Main>
                    <Routes>
                        <Route path="/" element={<FirstCertificatePage />} />
                        <Route
                            path="/verify"
                            element={<SecondCertificatePage />}
                        />
                    </Routes>
                </Main>
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

const Header = styled.header`
    h1 {
        font-size: 1em;
    }
`;

const Menu = styled.menu``;

const Main = styled.header``;
