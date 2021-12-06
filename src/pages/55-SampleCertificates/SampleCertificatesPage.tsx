import React from 'react';
import styled from 'styled-components';
import { AsyncContentComponent } from '../../components/AsyncContentComponent';
import { FirstCertificatePdfPage } from '../10-FirstCertificate/FirstCertificatePdfPage';
import { fetchAsFile } from '../../utils/fetchAsFile';

export function SampleCertificatesPage() {
    return (
        <SampleCertificatesDiv>
            <h1>Sample certificates</h1>
            <p>Here are samples how will your certificates look like:</p>
            <h2>First certificate</h2>
            <AsyncContentComponent
                content={fetchAsFile(
                    process.env.PUBLIC_URL + '/assets/samples/DevConf2018.jpg',
                ).then((file) => (
                    <FirstCertificatePdfPage
                        files={[file]}
                        setPayment={() => {}}
                    />
                ))}
            />

            {/* TODO: <h2>Second certificate</h2> */}
            {/* TODO: !!! */}
        </SampleCertificatesDiv>
    );
}

const SampleCertificatesDiv = styled.div``;


