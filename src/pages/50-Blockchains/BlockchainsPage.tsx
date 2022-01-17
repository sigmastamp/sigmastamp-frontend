import React from 'react';
import styled from 'styled-components';

export function BlockchainsPage() {
    return (
        <OraclesDiv>
            <h1>BlockchainsPage</h1>
            <p>SigmaStamp is working on theese blockchains:</p>

            <img
                className="logo"
                alt="sigmastamp logo"
                src="./blockchains/ergo.svg"
            />
        </OraclesDiv>
    );
}

const OraclesDiv = styled.div``;
