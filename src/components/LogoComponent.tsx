import React from 'react';
import styled from 'styled-components';

interface ILogoComponentProps {
    isWatermark?: boolean;
    isDark?: boolean;
}

export function LogoComponent({ isWatermark, isDark }: ILogoComponentProps) {
    return (
        <LogoElement>
            {/* TODO: !!! Logo should be ONLY vectorized SVG/PNG image */}
            <img
                className="logo"
                alt="sigmastamp logo"
                src={`./sigmastamp-logo.${isDark ? 'black' : 'white'}.svg`}
            />

            {!isWatermark && (
                <div>
                    <h1 className="name">SigmaStamp</h1>
                    <p className="claim">Timestamp your documents</p>
                </div>
            )}
        </LogoElement>
    );
}
const LogoElement = styled.div`
    /*/
    border: 1px dashed red; /**/

    display: flex;
    font-family: 'Oswald', sans-serif;
    color: white;

    img.logo {
        width: 4rem;
    }

    h1.name {
        display: block;
        font-size: 1.5em;
        margin: 0;
    }

    p.claim {
        display: block;
        font-size: 1em;
        margin: 0;
    }
`;

/**
 * TODO: Text reacting to isDark property
 */
