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
`;
