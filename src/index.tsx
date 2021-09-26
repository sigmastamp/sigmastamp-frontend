import { createHashHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { App } from './App';
import './index.css';
import { VerifyApp } from './VerifyApp';

const history = createHashHistory();

const HeaderElement = styled.header`
    h1 {
        font-size: 1em;
    }
`;

ReactDOM.render(
    <React.StrictMode>
        <HeaderElement>
            <h1>📜 Sigmastamp</h1>
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
