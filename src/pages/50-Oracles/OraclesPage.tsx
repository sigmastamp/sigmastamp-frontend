import React from 'react';
import styled from 'styled-components';
import { AsyncContentComponent } from '../../components/AsyncContentComponent';
import { ORACLES } from '../../config';

export function OraclesPage() {
    return (
        <OraclesDiv>
            <h1>Oracles</h1>
            <p>
                Theese are information from external world that will be
                incorporated into your first certificate:
            </p>
            {ORACLES.map((oracle) => (
                <div key={oracle.name}>
                    <AsyncContentComponent
                        content={async () => {
                            const data = await oracle.getData();

                            return (
                                <>
                                    {Object.entries(data).map(
                                        ([key, value]) => (
                                            <div key={key}>
                                                <b>
                                                    {/* @ts-ignore: Object.entries is dummy and cannot pass propper index signature type */}
                                                    {oracle.title}
                                                    {
                                                        (oracle as any)
                                                            .dataTitles[key]
                                                    }
                                                    :
                                                </b>
                                                {value}
                                            </div>
                                        ),
                                    )}
                                </>
                            );
                        }}
                    />
                </div>
            ))}
        </OraclesDiv>
    );
}

const OraclesDiv = styled.div``;
