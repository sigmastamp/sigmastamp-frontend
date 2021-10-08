import { createHashHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { App } from './App';
import { BUILD_DATE, BUILD_DETAILS_URL, VERSION } from './config';
import './index.css';
import { VerifyApp } from './VerifyApp';

console.info(
    `%c📜 Sigmastamp version ${VERSION}` +
        (!BUILD_DATE ? `` : ` build at ${BUILD_DATE.toISOString()}`) +
        (!BUILD_DETAILS_URL
            ? ``
            : ` view build details ${BUILD_DETAILS_URL.href}`),
    `background: #009EDD; color: white; font-size: 1.1em; font-weight: bold; padding: 5px; border-radius: 3px;`,
);

const history = createHashHistory();

const HeaderElement = styled.header`
    h1 {
        font-size: 1em;
    }
`;

ReactDOM.render(
    <React.StrictMode>
        <HeaderElement>
            <div id="sigmastamp_heading_div">
                <img className="logo_img" alt="sigmastamp logo" src="sigmastamp_logo.svg"/>
                <h1>SigmaStamp</h1>
            </div>
        </HeaderElement>
        <Router {...{ history }}>
            <Switch>
                <Route exact path="/">
                    <App />
                </Route>
                <Route exact path="/verify">
                    <VerifyApp />
                </Route>
            </Switch>
        </Router>
    </React.StrictMode>,
    document.getElementById('root'),
);
