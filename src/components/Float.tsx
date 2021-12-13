import * as React from 'react';
import styled from 'styled-components';

export function Float({ children }: React.PropsWithChildren<{}>) {
    return (
        <FloatDiv className={`outer`}>
            <div className={`inner`}>{children}</div>
        </FloatDiv>
    );
}

const FloatDiv = styled.div`
    position: absolute;

    .inner {
        position: relative;
    }
`;
