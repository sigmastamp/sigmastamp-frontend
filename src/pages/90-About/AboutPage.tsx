import React from 'react';
import styled from 'styled-components';

export function AboutPage() {
    return (
        <AboutPageDiv>
            <h1>About sigmastamp</h1>
            <p>Verify the time origin of your documents</p>

            <h2>How it started?</h2>

            <h2>People behing SigmaStamp?</h2>

            <div className="authors">
                <div className="author">
                    {/* TODO: !!! @nitram147 <- @hejny Please write basic information about yourself */}
                    <a href="https://www.pavolhejny.com/">
                        <img alt="Pavol Hejný" src="./team/pavol-hejny.png" />
                    </a>
                    <div className="name">Nitram Martin</div>
                    <div className="role">Blockchain</div>
                </div>

                <div className="author">
                    <a href="https://www.pavolhejny.com/">
                        <img alt="Pavol Hejný" src="./team/pavol-hejny.png" />
                    </a>
                    <div className="name">Pavol Hejný</div>
                    <div className="role"> Frontend</div>
                </div>
            </div>

            <h2>Logo</h2>
            <img
                className="logo"
                alt="SigmaStamp logo"
                src="./sigmastamp-logo.white.svg"
            />
            <img
                className="logo"
                alt="SigmaStamp logo"
                src="./sigmastamp-logo.black.svg"
            />
        </AboutPageDiv>
    );
}

const AboutPageDiv = styled.div`
    /*/
    border: 1px dashed red; /**/

    .authors {
        display: flex;
    }

    .author {
        text-align: center;
    }

    .author img {
        width: 300px;
    }

    .author .name {
        font-size: 1.5em;
    }

    .author .role {
        font-size: 1.1em;
    }

    img.logo {
        width: 200px;
    }
`;

/**
 * TODO: !!! @nitram147 <- @hejny Please write basic information about the sigmastamp
 * TODO: This info should be also part of repository readme
 */
