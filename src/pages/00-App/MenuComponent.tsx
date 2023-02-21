import React from 'react';
import styled from 'styled-components';
import { ErgoConnectorButton } from '../../components/ErgoConnectorButton';
import { MenuItemsComponent } from './MenuItemsComponent';

import { IWallet } from './App';

export function MenuComponent(props: {
    wallet: IWallet;
    setWallet: React.Dispatch<React.SetStateAction<IWallet>>;
}) {
    return (
        <MenuElement>
            <MenuItemsComponent />
            <ErgoConnectorButton
                wallet={props.wallet}
                setWallet={props.setWallet}
            />
        </MenuElement>
    );
}
const MenuElement = styled.div`
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

/**
 * TODO: @hejny <HeaderComponent is stupid name - name it as MenuComponent and MenuComponent rename to MenuItemsComponent
 */
