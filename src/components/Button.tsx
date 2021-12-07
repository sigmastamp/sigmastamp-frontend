import styled from 'styled-components';

export const Button = styled.button`
    border: solid 1.5px #009edf;
    background-color: #009edf;
    color: white;
    border-radius: 5px;
    padding: 7px 18px;
    font-size: 0.9em;
    margin-top: 5px;
    margin-bottom: 5px;

    cursor: pointer;
    display: inline-block;
    text-decoration: none;

    &:hover {
        background-color: #8bbfd3;
    }
`;
