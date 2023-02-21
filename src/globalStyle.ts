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

`;

/**
 * TODO: @hejny Dark/light theme from system
 * TODO: @hejny Dark/light theme toggle
 */
