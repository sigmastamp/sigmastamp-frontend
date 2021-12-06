import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export function MenuComponent() {
    return (
        <MenuElement>
            <ul>
                <li>
                    <NavLink to="/">First certificate</NavLink>
                </li>
                <li>
                    <NavLink to="/verify">Second certificate</NavLink>
                </li>
                <li>
                    <NavLink to="/about">About</NavLink>
                </li>
            </ul>
        </MenuElement>
    );
}
const MenuElement = styled.menu`
    a {
        color: #555;
        font-size: 0.7em;
    }

    a.active {
        color: #7e7d7d;
        font-size: 0.7em;
    }
`;
