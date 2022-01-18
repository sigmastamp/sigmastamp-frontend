import React from 'react';
import { BUILD_DATE, BUILD_DETAILS_URL, VERSION } from '../../config';
import { TechnicalStatusPageBadges } from './TechnicalStatusPageBadges';

export function TechnicalStatusPage() {
    return (
        <>
            <h1>Technical status</h1>

            <TechnicalStatusPageBadges />

            <b>
                {' '}
                <a
                    href={`https://github.com/sigmastamp/sigmastamp-frontend/`}
                    target="_blank"
                    rel="noreferrer"
                >
                    GitHub repository
                </a>
            </b>
            <div>
                <b>Version: </b>
                <a
                    href={`https://github.com/sigmastamp/sigmastamp-frontend/tree/v${VERSION}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    {VERSION}
                </a>
            </div>
            {BUILD_DETAILS_URL && BUILD_DATE && (
                <div>
                    <b> Build date: </b>
                    <a
                        href={BUILD_DETAILS_URL?.href}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {BUILD_DATE.toUTCString()}
                    </a>
                </div>
            )}
        </>
    );
}

/**
 *
 * TODO: @hejny Link to source code
 * TODO: @nitram147 <- @hejny There should be some way how to determine if the server is working propperly
 * TODO: @hejny do not allow to send payment if the server is not synced
 */
