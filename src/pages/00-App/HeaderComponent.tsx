import React from 'react';
import styled from 'styled-components';
import { LogoComponent } from '../../components/LogoComponent';
import { MenuComponent } from './MenuComponent';
import { ErgoConnectorButton } from "../../components/ErgoConnectorButton";

import { IWallet } from "../00-App/App";

export function HeaderComponent(props: {
    wallet: IWallet,
    setWallet: React.Dispatch<React.SetStateAction<IWallet>>;
}) {
    return (
        <HeaderElement>
            <LogoComponent />
            <MenuComponent />
            <ErgoConnectorButton wallet={props.wallet} setWallet={props.setWallet} />
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
