import React from 'react';
import styled from 'styled-components';

export function HeaderComponent() {
    return (
        <HeaderElement>
            <div id="sigmastamp_heading_div">
                <img
                    className="logo_img"
                    alt="sigmastamp logo"
                    src="sigmastamp_logo.svg" />
                <h1>SigmaStamp</h1>
            </div>
        </HeaderElement>
    );
}
const HeaderElement = styled.header`
    h1 {
        font-size: 1em;
    }
`;
