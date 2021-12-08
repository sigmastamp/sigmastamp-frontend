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
                            const data =
                                await oracle.getData(/* !!! Handle errors */);

                            return (
                                <>
                                    {data.map(
                                        ({ title, value, format, source }) => (
                                            <div
                                                key={title}
                                                title={`${oracle.title} ${title} [${format}]`}
                                            >
                                                <b>
                                                    {`${oracle.title} ${title}: `}
                                                </b>

                                                <a href={source?.href}>
                                                    {value}
                                                </a>
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

/**
 * TODO:
 * - Information how to add oracles (link to github)
 */
