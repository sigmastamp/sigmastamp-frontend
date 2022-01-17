import React from 'react';
import styled from 'styled-components';
import { AsyncContentComponent } from '../../components/AsyncContentComponent';
import { fetchAsFile } from '../../utils/fetchAsFile';
import { FirstCertificatePdfPage } from '../10-FirstCertificate/FirstCertificatePdfPage';

export function SampleCertificatesPage() {
    return (
        <SampleCertificatesDiv>
            <h1>Sample certificates</h1>
            <p>Here are samples how will your certificates look like:</p>

            <div className="samples">
                <div className="sample">
                    <h2>Multiple files</h2>
                    <AsyncContentComponent
                        content={async () => (
                            <FirstCertificatePdfPage
                                files={[
                                    await fetchAsFile(
                                        process.env.PUBLIC_URL +
                                            '/samples-to-sign/sample1.jpg',
                                    ),
                                    await fetchAsFile(
                                        process.env.PUBLIC_URL +
                                            '/samples-to-sign/sample1.mp3',
                                    ),
                                    await fetchAsFile(
                                        process.env.PUBLIC_URL +
                                            '/samples-to-sign/sample1.c',
                                    ),
                                ]}
                                setPayment={() => {}}
                            />
                        )}
                    />
                </div>

                <div className="sample">
                    <h2>First certificate with image</h2>
                    <AsyncContentComponent
                        content={async () => (
                            <FirstCertificatePdfPage
                                files={[
                                    await fetchAsFile(
                                        process.env.PUBLIC_URL +
                                            '/samples-to-sign/sample1.jpg',
                                    ),
                                ]}
                                setPayment={() => {}}
                            />
                        )}
                    />
                </div>

                <div className="sample">
                    <h2>First certificate with code</h2>
                    <AsyncContentComponent
                        content={async () => (
                            <FirstCertificatePdfPage
                                files={[
                                    await fetchAsFile(
                                        process.env.PUBLIC_URL +
                                            '/samples-to-sign/sample1.c',
                                    ),
                                ]}
                                setPayment={() => {}}
                            />
                        )}
                    />
                </div>

                <div className="sample">
                    <h2>First certificate with sound in mp3</h2>
                    <AsyncContentComponent
                        content={async () => (
                            <FirstCertificatePdfPage
                                files={[
                                    await fetchAsFile(
                                        process.env.PUBLIC_URL +
                                            '/samples-to-sign/sample1.mp3',
                                    ),
                                ]}
                                setPayment={() => {}}
                            />
                        )}
                    />
                </div>
            </div>
            {/* TODO: <h2>Second certificate</h2> */}
            {/* TODO: !!! */}
        </SampleCertificatesDiv>
    );
}

const SampleCertificatesDiv = styled.div`
    .samples {
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        justify-content: center;
    }

    .sample {
        margin: 10px;
    }
`;
