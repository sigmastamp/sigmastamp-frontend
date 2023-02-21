import { createGlobalStyle } from 'styled-components';

// Note: Do not use this file for local components and all CSS logic put into styled components

export const GlobalStyle = createGlobalStyle`



    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
            'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
            'Helvetica Neue', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        // background-color: hsl(224,15%,20%);
        color: black;
        margin: 0;
    }


    button {
        border: solid 1.5px rgb(78, 78, 78);
        background-color: rgb(242, 242, 242);
        color: rgb(78, 78, 78);
        border-radius: 6px;
        padding: 7px 18px;
        font-size: 0.9em;
        margin: 0 5px;
        cursor: pointer;
        display: inline-block;
        -webkit-text-decoration: none;
        text-decoration: none;
    }
`;

/**
 * TODO: @hejny Dark/light theme from system
 * TODO: @hejny Dark/light theme toggle
 */
