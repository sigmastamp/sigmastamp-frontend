import React, { useState } from 'react';
import styled from 'styled-components';
import { AsyncContentComponent } from '../../components/AsyncContentComponent';
import { ErrorComponent } from '../../components/ErrorComponent';
import { ORACLES } from '../../config';

interface IOracleResult {
    loaded: boolean,
    data: any
}

const DEFAULT_ORACLE_RESULT: IOracleResult = {
    loaded: false, data: ""
}

// TODO: @hejny <--- fix all of this spaghetti code implementation...

interface IOracleStateMappings{
    BTC: (IOracleResult | React.Dispatch<React.SetStateAction<IOracleResult>>)[];
    ETH: (IOracleResult | React.Dispatch<React.SetStateAction<IOracleResult>>)[];
    LTC: (IOracleResult | React.Dispatch<React.SetStateAction<IOracleResult>>)[];
    DATE: (IOracleResult | React.Dispatch<React.SetStateAction<IOracleResult>>)[];
    NYTIMES: (IOracleResult | React.Dispatch<React.SetStateAction<IOracleResult>>)[];
}

function allOraclesDataLoaded(mappings: IOracleStateMappings): boolean{
    for(const key in mappings){
        if(!((mappings as any)[key][0].loaded)) return false;
    }
    return true;
}

export function OraclesPage() {

    const [resultBitcoinOracle, setResultBitcoinOracle] = useState<IOracleResult>(DEFAULT_ORACLE_RESULT);
    const [resultEthereumOracle, setResultEthereumOracle] = useState<IOracleResult>(DEFAULT_ORACLE_RESULT);
    const [resultLitecoinOracle, setResultLitecoinOracle] = useState<IOracleResult>(DEFAULT_ORACLE_RESULT);
    const [resultDateOracle, setResultDateOracle] = useState<IOracleResult>(DEFAULT_ORACLE_RESULT);
    const [resultRssFeedOracle, setResultRssFeedOracle] = useState<IOracleResult>(DEFAULT_ORACLE_RESULT);

    const mappings: IOracleStateMappings = {
        "BTC" : [resultBitcoinOracle, setResultBitcoinOracle],
        "ETH" : [resultEthereumOracle, setResultEthereumOracle],
        "LTC" : [resultLitecoinOracle, setResultLitecoinOracle],
        "DATE" : [resultDateOracle, setResultDateOracle],
        "NYTIMES" : [resultRssFeedOracle, setResultRssFeedOracle],
    };

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
                                    await oracle.getData(/* TODO: @hejny Auto refresh */);
                                // (mappings as any)[oracle.name][1]({loaded: true, data: data});

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
                                            {/* TODO: @hejny Link to GitHub */}
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
            { !allOraclesDataLoaded(mappings) ? <p>Loading data from oracles....</p> : <p>Loaded</p> }
        </OraclesDiv>
    );
}

const OraclesDiv = styled.div``;

/**
 * TODO: @hejny Information how to add oracles (link to github)
 */
