import React from 'react';
import styled from 'styled-components';
import { LogoComponent } from '../../components/LogoComponent';
import { MenuComponent } from './MenuComponent';

export function HeaderComponent() {
    return (
        <HeaderElement>
            <LogoComponent />
            <MenuComponent />
        </HeaderElement>
    );
}
const HeaderElement = styled.header`
    /*/
    border: 1px dashed red; /**/

    @media (max-width: 850px) {
        display: flex;
        align-items: flex-start;
        align-content: flex-start;

        & > * {
            border: 1px dashed transparent;
        }

        ul {
            margin: 0;
            display: flex;
        }

        ul li {
            border-right: 1px solid #ccc;
            padding: 10px;
        }
    }
`;
