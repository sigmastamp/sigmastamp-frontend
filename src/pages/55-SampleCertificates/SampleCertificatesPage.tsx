import React from 'react';
import styled from 'styled-components';
import { FirstCertificatePdfPage } from '../10-FirstCertificate/FirstCertificatePdfPage';

export function SampleCertificatesPage() {
    return (
        <SampleCertificatesDiv>
            <h1>Sample certificates</h1>
            <p>Here are samples how will your certificates look like:</p>
            <h2>First certificate</h2>
            <FirstCertificatePdfPage
                files={
                    [
                        /* TODO: !!! Put here some sample image */
                    ]
                }
                setPayment={() => {}}
            />
            {/* TODO: <h2>Second certificate</h2> */}
            {/* TODO: !!! */}
        </SampleCertificatesDiv>
    );
}

const SampleCertificatesDiv = styled.div``;
