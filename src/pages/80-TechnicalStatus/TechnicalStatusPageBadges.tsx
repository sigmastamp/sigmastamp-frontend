import React from 'react';

export function TechnicalStatusPageBadges() {
    return (
        <>
      
            <a
                href="https://raw.githubusercontent.com/sigmastamp/sigmastamp-frontend/master/LICENSE"
                rel="nofollow"
            >
                <img
                    src="https://camo.githubusercontent.com/09c911a390e8b97ab6b67abca28fa25089552380b7bd3266805698dd4f68664c/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c6963656e73652f7369676d617374616d702f7369676d617374616d702d66726f6e74656e642e7376673f7374796c653d666c6174"
                    alt="License"
                    data-canonical-src="https://img.shields.io/github/license/sigmastamp/sigmastamp-frontend.svg?style=flat"
                />
            </a>
            <a href="https://github.com/sigmastamp/sigmastamp-frontend/actions/workflows/test.yml">
                <img
                    src="https://github.com/sigmastamp/sigmastamp-frontend/actions/workflows/test.yml/badge.svg"
                    alt="Test"
                />
            </a>
            <a href="https://github.com/sigmastamp/sigmastamp-frontend/actions/workflows/lint.yml">
                <img
                    src="https://github.com/sigmastamp/sigmastamp-frontend/actions/workflows/lint.yml/badge.svg"
                    alt="Lint"
                />
            </a>
            <a
                href="https://snyk.io/test/github/sigmastamp/sigmastamp-frontend"
                rel="nofollow"
            >
                <img
                    src="https://camo.githubusercontent.com/2df9dc47f5366c33c81e3381b1679660e543aac075fddd7f309a0834a2293767/68747470733a2f2f736e796b2e696f2f746573742f6769746875622f7369676d617374616d702f7369676d617374616d702d66726f6e74656e642f62616467652e737667"
                    alt="Known Vulnerabilities"
                    data-canonical-src="https://snyk.io/test/github/sigmastamp/sigmastamp-frontend/badge.svg"
                />
            </a>
            <a href="https://github.com/sigmastamp/sigmastamp-frontend/issues">
                <img
                    src="https://camo.githubusercontent.com/0474e5b937ce5602e0fabe656fd946f62fd8201d7de737048c7a12b8c17a18b8/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6973737565732f7369676d617374616d702f7369676d617374616d702d66726f6e74656e642e7376673f7374796c653d666c6174"
                    alt="Issues"
                    data-canonical-src="https://img.shields.io/github/issues/sigmastamp/sigmastamp-frontend.svg?style=flat"
                />
            </a>
        </>
    );
}
