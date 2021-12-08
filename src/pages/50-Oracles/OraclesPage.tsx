import React from 'react';
import styled from 'styled-components';
import { AsyncContentComponent } from '../../components/AsyncContentComponent';
import { ErrorComponent } from '../../components/ErrorComponent';
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
                            try {
                                const data =
                                    await oracle.getData(/* !!! Handle errors */);

                                return (
                                    <>
                                        {data.map(
                                            ({
                                                title,
                                                value,
                                                format,
                                                source,
                                            }) => (
                                                <div
                                                    key={title}
                                                    title={`${title} [${format}]`}
                                                >
                                                    <b>{`${title}: `}</b>

                                                    <a href={source?.href}>
                                                        {value}
                                                    </a>
                                                </div>
                                            ),
                                        )}
                                    </>
                                );
                            } catch (error) {
                                if (error instanceof Error) {
                                    return (
                                        <ErrorComponent>
                                            Error occured when getting data from{' '}
                                            {oracle.constructor.name}:<br />
                                            {error.message}
                                            {/* TODO: !!! Link to GitHub */}
                                        </ErrorComponent>
                                    );
                                } else {
                                    throw error;
                                }
                            }
                        }}
                    />
                </div>
            ))}
        </OraclesDiv>
    );
}

const OraclesDiv = styled.div``;

/**
 * TODO:
 * - Information how to add oracles (link to github)
 */
