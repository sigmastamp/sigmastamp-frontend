import React from 'react';
import styled from 'styled-components';


export function Center({
    children,
    isFlexed,
    className,
}: React.PropsWithChildren<{ isFlexed?: boolean; className?: string }>) {
    return (
        <CenterDiv className={`outer ${className}`}>
            {isFlexed ? (
                children
            ) : (
                <div className={`inner ${className}`}>{children}</div>
            )}
        </CenterDiv>
    );
}

const CenterDiv = styled.div`
    /*/

    border: 1px dashed red;

    & > * {
        border: 1px dashed yellow;
    }

    /**/

    position: flex;
    flex-direction: column;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .inner {
    }
`;
