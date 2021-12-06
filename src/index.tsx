import React from 'react';
import ReactDOM from 'react-dom';
import { BUILD_DATE, BUILD_DETAILS_URL, VERSION } from './config';
import './index.css';
import { App } from './pages/App/App';

console.info(
    `%c📜 Sigmastamp version ${VERSION}` +
        (!BUILD_DATE ? `` : `\nBuild at ${BUILD_DATE.toLocaleString()}`) +
        (!BUILD_DETAILS_URL
            ? ``
            : `\nView build details ${BUILD_DETAILS_URL.href}`),
    `background: #009EDD; color: white; font-size: 1.1em; font-weight: bold; padding: 5px; border-radius: 3px;`,
);

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root'),
);
