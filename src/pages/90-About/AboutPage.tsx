import React from 'react';
import styled from 'styled-components';

export function AboutPage() {
    return (
        <AboutPageDiv>
            <h1>About sigmastamp</h1>
            <p>Verify the time origin of your documents</p>

            <h2>How it started</h2>

            <h2>Who is behing SigmaStamp</h2>

            {/* TODO: @nitram147 Please write basic information about yourself */}

            <a href="https://www.pavolhejny.com/">
                <img
                    className="author"
                    alt="Pavol Hejný"
                    src="./team/pavol-hejny.png"
                />
            </a>

            <h2>Logo</h2>
            <img
                className="logo"
                alt="sigmastamp logo"
                src="./sigmastamp-logo.white.svg"
            />
            <img
                className="logo"
                alt="sigmastamp logo"
                src="./sigmastamp-logo.black.svg"
            />
        </AboutPageDiv>
    );
}

const AboutPageDiv = styled.div`
    /*/
    border: 1px dashed red; /**/

    img.author {
        width: 300px;
    }

    img.logo {
        width: 200px;
    }
`;

/**
 * TODO: @nitram147 Please write basic information about the sigmastamp
 * TODO: This info should be also part of repository readme
 */
