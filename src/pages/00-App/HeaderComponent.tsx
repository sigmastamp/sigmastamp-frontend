import React from 'react';
import styled from 'styled-components';
import { MenuComponent } from './MenuComponent';

export function HeaderComponent() {
    return (
        <HeaderElement>
            <div className="sigmastamp_heading_div">
                <img
                    className="logo_img"
                    alt="sigmastamp logo"
                    src="sigmastamp_logo.svg"
                />
                <h1>SigmaStamp</h1>
            </div>

            <MenuComponent />
        </HeaderElement>
    );
}
const HeaderElement = styled.header`
    /*/
    border: 1px dashed red; /**/

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
