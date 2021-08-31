import { createHashHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, Switch } from 'react-router-dom';
import { App } from './App';
import './index.css';
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
