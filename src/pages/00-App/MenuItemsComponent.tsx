import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { ROUTES } from '../../routes';

export function MenuItemsComponent() {
    return (
        <MenuElement>
            <ul>
                {/*<li>
                    <NavLink to={ROUTES.FirstCertificate}>
                        First certificate
                    </NavLink>
                </li>*/}
                <li>
                    <NavLink to={ROUTES.VerificationPage}>
                        Verification page(RENAME)
                    </NavLink>
                </li>
                {/*<li>
                    <NavLink to={ROUTES.Blockchains}>Blockchains</NavLink>
                </li>*/}
                <li>
                    <NavLink to={ROUTES.Oracles}>Oracles</NavLink>
                </li>
                {/*<li>
                    <NavLink to={ROUTES.SampleCertificates}>
                        Sample certificates
                    </NavLink>
                </li>*/}
                <li>
                    <NavLink to={ROUTES.HowItWorks}>How it works?</NavLink>
                </li>
                {/* Note: This page is prepared for the future.
                <li>
                    <NavLink to={ROUTES.Faq}>FAQ</NavLink>
                </li> */}
                {/*<li>
                    <NavLink to={ROUTES.TechnicalStatus}>
                        Technical status
                    </NavLink>
                </li>*/}
                <li>
                    <NavLink to={ROUTES.Playground}>Playground</NavLink>
                </li>
                {/*<li>
                    <NavLink to={ROUTES.About}>About</NavLink>
                </li>*/}
            </ul>
        </MenuElement>
    );
}
const MenuElement = styled.menu`
    /*/
    outline: 1px dashed red; /**/

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
        color: #aaaaaa !important;
        font-size: 0.7em;
        text-decoration: none;

        transition: color 0.2s ease-in-out;
    }

    a.active,
    a:hover {
        color: #eeeded !important;
    }

    @media (max-width: 850px) {
    }
`;
