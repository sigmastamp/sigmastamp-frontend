import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { ROUTES } from '../../config';

export function MenuComponent() {
    return (
        <MenuElement>
            <ul>
                <li>
                    <NavLink to={ROUTES.FirstCertificate}>
                        First certificate
                    </NavLink>
                </li>
                <li>
                    <NavLink to={ROUTES.SecondCertificate}>
                        Second certificate
                    </NavLink>
                </li>
                <li>
                    <NavLink to={ROUTES.About}>About</NavLink>
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
