import * as React from 'react';
import styled from 'styled-components';
import { Center } from './Center';
import { LogoComponent } from './LogoComponent';

export function UploadZoneSigmastampContent({
    children,
}: React.PropsWithChildren<{}>) {
    return (
        <UploadZoneContentDiv>
            <Center isFlexed>
                <LogoComponent isWatermark />
                {children}
            </Center>
        </UploadZoneContentDiv>
    );
}

const UploadZoneContentDiv = styled.div`
    font-size: 1.5em;
    color: #cccccc;

    img.logo {
        display: block;
        width: 230px;
        opacity: 0.5;
    }
`;
