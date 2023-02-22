import { createGlobalStyle } from 'styled-components';

// Note: Do not use this file for local components and all CSS logic put into styled components

export const GlobalStyle = createGlobalStyle`




    body {
        margin: 0;
    }


    button, .button {
      outline: none;
        background-color: rgb(242, 242, 242);
        color: rgb(78, 78, 78);

        border-radius: 6px;
        padding: 7px 18px;
        font-size: 0.9em;
        margin: 0 5px;
        cursor: pointer;
        display: inline-block;
        text-decoration: none;
    }

    a, a:visited {
      color: #333;
    }
`;

/**
 * TODO: @hejny Dark/light theme from system
 * TODO: @hejny Dark/light theme toggle
 */
