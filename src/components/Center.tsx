import * as React from 'react';
import styled from 'styled-components';

export function Center({
    children,
    isFlexed,
}: React.PropsWithChildren<{ isFlexed?: boolean }>) {
    return (
        <CenterDiv className={`outer`}>
            {isFlexed ? children : <div className={`inner`}>{children}</div>}
        </CenterDiv>
    );
}

const CenterDiv = styled.div`
    /*/
    border: 1px dashed red; /**/

    position: flex;
    flex-direction: column;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .inner {
    }
`;
