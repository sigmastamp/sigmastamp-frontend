import React from 'react';
import styled from 'styled-components';

export function BlockchainsPage() {
    return (
        <OraclesDiv>
            <h1>BlockchainsPage</h1>
            <p>SigmaStamp is working on theese blockchains:</p>

            <a href="https://ergoplatform.org/">
                <img
                    className="logo"
                    alt="sigmastamp logo"
                    src="./blockchains/ergo.svg"
                />
            </a>
        </OraclesDiv>
    );
}

const OraclesDiv = styled.div``;
