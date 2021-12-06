import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export function MenuComponent() {
    return (
        <MenuElement>
            <ul>
                <li>
                    <Link to="/verify">Or verify your 1st certificate.</Link>
                </li>
                <li>
                    <Link to="/about">
                        TODO: !!! Short information about Sigmastamp, version
                        and the build (leading to the more detailed information)
                    </Link>
                </li>
            </ul>
        </MenuElement>
    );
}
const MenuElement = styled.menu``;
