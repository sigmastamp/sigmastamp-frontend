import React from 'react';
import styled from 'styled-components';

export function LogoComponent() {
    return (
        <LogoElement>
            <div className="sigmastamp_heading_div">
                {/* TODO: !!! Logo should be ONLY vectorized SVG/PNG image */}
                <img
                    className="logo_img"
                    alt="sigmastamp logo"
                    src="sigmastamp_logo.svg"
                />
                <h1>SigmaStamp</h1>
            </div>
        </LogoElement>
    );
}
const LogoElement = styled.div`
    /*/
    border: 1px dashed red; /**/

    font-family: 'Oswald', sans-serif;
    color: white;

    h1 {
        font-size: 1.5em;
    }

    .sigmastamp_heading_div {
        display: flex;
        //align-items: flex-start;
        //justify-content: flex-start;
    }

    .logo_img {
        width: 4rem;
        filter: invert(1);
    }
`;
