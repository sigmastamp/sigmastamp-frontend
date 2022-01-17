import React from 'react';
import styled from 'styled-components';

export function Loader() {
    return (
        <LoaderDiv>
            <div className="spinner"></div>
        </LoaderDiv>
    );
}

const LoaderDiv = styled.div``;
