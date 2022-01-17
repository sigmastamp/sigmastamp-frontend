import React from 'react';

export function TechnicalStatusPage() {
    return (
        <>
            <h1>Technical status</h1>
        </>
    );
}

/**
 *
 * - version and the build (leading to the more detailed information)
 * - Link toSource code
 * - Server + services status (+ !!! do not allow to send payment if the server is not synced)
 *
 * TODO: @nitram147 There should be some way how to determine if the server is workinh;
 * TODO: Status badges should be also part of the repository readme
 */
