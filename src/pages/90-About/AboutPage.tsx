import React from 'react';
import { LoremIpsum } from 'react-lorem-ipsum';

export function AboutPage() {
    return (
        <>
            <h1>About sigmastamp</h1>
            <p>Foo bar</p>

            <LoremIpsum p={20} />
        </>
    );
}

/**
 * TODO:
 * - !!! Short information about Sigmastamp
 * - !!! About Us
 * - version and the build (leading to the more detailed information)
 * - Source code
 * - Server + services status (+ !!! do not allow to send payment if the server is not synced)
 */
