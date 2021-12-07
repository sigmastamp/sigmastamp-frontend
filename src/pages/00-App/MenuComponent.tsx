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
                    <NavLink to={ROUTES.Oracles}>Oracles</NavLink>
                </li>
                <li>
                    <NavLink to={ROUTES.SampleCertificates}>
                        Sample certificates
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
    /*/
    border: 1px dashed red; /**/

    padding-left: 0px;
    padding-left: 10px;

    ul {
        list-style: none;
        padding: 0;
    }

    li {
        margin: 0;
        font-size: 1.5em;
    }

    a {
        color: #7e7d7d;
        font-size: 0.7em;
        text-decoration: none;
    }

    a.active {
        color: #d3d3d3;
        font-size: 0.7em;
    }
`;
