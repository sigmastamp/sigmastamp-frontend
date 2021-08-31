import ReactDOM from 'react-dom';
import { App } from './App';
import './index.css';
import { createHashHistory, History } from 'history';
import { Route, Router, Switch } from 'react-router-dom';
import React from 'react';
import { VerifyApp } from './VerifyApp';

const history = createHashHistory();

ReactDOM.render(
    <React.StrictMode>
        <h1>Sigmastamp</h1>
        <Router {...{ history: history }}>
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
