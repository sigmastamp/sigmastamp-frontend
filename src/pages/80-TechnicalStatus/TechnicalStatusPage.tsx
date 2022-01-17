import React from 'react';
import { TechnicalStatusPageBadges } from './TechnicalStatusPageBadges';

export function TechnicalStatusPage() {
    return (
        <>
            <h1>Technical status</h1>

            <TechnicalStatusPageBadges />
        </>
    );
}

/**
 *
 * TODO: version and the build (leading to the more detailed information as in the console - make it to some sharable util + pass it into the Collboard)
 * TODO: Link to source code
 * TODO: @nitram147 There should be some way how to determine if the server is workinh;
 *       Server + services status (+ !!! do not allow to send payment if the server is not synced)
 * TODO: Status badges should be also part of the repository readme
 */
