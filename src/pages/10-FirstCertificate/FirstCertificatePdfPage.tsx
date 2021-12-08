import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AsyncContentComponent } from '../../components/AsyncContentComponent';
import { Button } from '../../components/Button';
import { ErrorComponent } from '../../components/ErrorComponent';
import { IPaymentGateProps } from '../../components/PaymentGate';
import { PdfPage } from '../../components/PdfPage';
import { QRCodeLink } from '../../components/QRCodeLink';
import { ORACLES, PAGE_CM_TO_PX_RATIO_FOR_PREVIEW, ROUTES } from '../../config';
import { blake2b256 } from '../../hash/blake2b256';
import { string_base64, string_hex } from '../../interfaces/stringTypes';
import { FakeFileOracle } from '../../oracles/FakeFileOracle';
import { IOracle, IOracleData } from '../../oracles/_IOracle';
import { createSigmaStampNFT } from '../../smartcontracts/createSigmaStampNFT';
import { hexToBase64 } from '../../utils/hexToBase64';
import { promptAsync } from '../../utils/promptAsync';
import { readFileAsDataUrl } from '../../utils/readFileAsDataUri';
import { LogoComponent } from '../00-App/LogoComponent';

interface IFirstCertificatePdfPageProps {
    files: File[];
    setPayment: (v: IPaymentGateProps) => void;
}

export function FirstCertificatePdfPage(props: IFirstCertificatePdfPageProps) {
    const { files, setPayment } = props;
    const [data, setData] = useState<IOracleData[]>([]);
    const [errors, setErrors] = useState<Error[]>([]);

    useEffect(() => {
        Promise.all(
            (
                [
                    ...files.map((file) => new FakeFileOracle(file)),
                    ...ORACLES,
                ] as IOracle[]
            ).map(async (oracle) => {
                try {
                    return { data: await oracle.getData(), error: null };
                } catch (error) {
                    if (error instanceof Error) {
                        return { data: [], error };
                    } else {
                        throw error;
                    }
                }
            }),
        ).then((dataAndErrors) => {
            setData(dataAndErrors.map(({ data }) => data).flat());
            setErrors(
                dataAndErrors
                    .map(({ error }) => error)
                    .filter((e) => e !== null) as Error[],
            );
        });
    }, [files]);

    return (
        <>
            {errors.length > 0 && (
                <ErrorComponent>
                    There occured some errors in getting oracle data You can
                    still download the certificate but some data from external
                    world may be missing
                    <br />
                    See more details on{' '}
                    <Link to={ROUTES.Oracles}>oracles page</Link>.
                </ErrorComponent>
            )}
            <PdfPage
                renderUi={({ createPdf }) => {
                    return (
                        <Button
                            onClick={async () => {
                                // TODO: !!! Download logic into separate util + setPayment should not be in IFirstCertificatePdfPageProps

                                const certificateFile = new File(
                                    [await createPdf()],
                                    // TODO: Encorporate filename into certificate filename
                                    'certificate1.pdf' /* TODO: Maybe add current {lastModified: 1534584790000}*/,
                                );

                                // TODO: !!! Add files into certificate

                                //saveAs(certificateFile);
                                const zip = new JSZip();
                                for (const file of files) {
                                    zip.file(file.name, file);
                                }
                                zip.file(certificateFile.name, certificateFile);

                                const zipBlob = await zip.generateAsync({
                                    type: 'blob',
                                });

                                const zipHash: string_hex = await blake2b256(
                                    zipBlob,
                                );

                                const zipHashBase64: string_base64 =
                                    await hexToBase64(zipHash);

                                saveAs(
                                    zipBlob,
                                    // TODO: Encorporate filename into certificate filename
                                    `certificate1.${zipHash.substring(
                                        0,
                                        5,
                                    )}.zip`,
                                );

                                // TODO @hejny - replace this with custom form (details mentioned in createSigmaStampNFT.ts)
                                // TODO @hejny - also move proof of today function away, so user will be able to decide whether he want to stamp file or he will make special version of file via proof of today page and then he will stamp this proof of today generated zip file (certificate)
                                // but it should be always opt-in, not opt-out !!!
                                const userAddress = await promptAsync(
                                    'Please fill your Ergo address',
                                    '3Ww7y6vi4NhFZ1ufsEF8vQNyGrvhNmeMmDWP9h3s4qSEFSMoGooV' /* !!! Unhardocde */,
                                );
                                if (!userAddress) {
                                    return;
                                }

                                //TODO @hejny - include also page for "return" - this page will be used in case that ergo-assembler failed and users funds got stucked on proxy-smartcontract, see https://sigmausd.io/#/refund <-- we need to implement something like this or the exact "clone" of this...
                                setPayment(
                                    await createSigmaStampNFT({
                                        userAddress,
                                        documentHashInBase64: zipHashBase64,
                                        documentHashInHex: zipHash,
                                    }),
                                );
                            }}
                        >
                            Download 1st certificate
                        </Button>
                    );
                }}
            >
                <PreviewWithLogo>
                    <div className={`logo outer`}>
                        <div className={`logo inner`}>
                            <LogoComponent />
                        </div>
                    </div>
                    {files.map((file) => (
                        <AsyncContentComponent
                            key={file.name}
                            content={readFileAsDataUrl(file).then((data) => (
                                <img
                                    src={data}
                                    alt={`Preview of ${file.name}`}
                                    className={`file`}
                                />
                            ))}
                        />
                    ))}
                </PreviewWithLogo>
                {/* TODO: Here is weird space between preview and data */}
                <Data>
                    {data.map(
                        ({ title, value, format, source, getCompactValue }) => (
                            <div
                                className="datacell"
                                key={title}
                                title={`${title} [${format}]`}
                            >
                                {source && (
                                    <QRCodeLink link={source} margin={0} />
                                )}
                                <div>
                                    <b className="key render-as-text">{`${title}: `}</b>
                                    <br />
                                    <span className="value render-as-text">
                                        {getCompactValue
                                            ? getCompactValue(16)
                                            : value}
                                    </span>
                                </div>
                            </div>
                        ),
                    )}
                </Data>
            </PdfPage>
        </>
    );
}

const PreviewWithLogo = styled.div`
    .logo.outer {
        position: absolute;
    }

    .logo.inner {
        position: relative;
    }

    img.file {
        max-width: 100%;
        max-height: ${300 * PAGE_CM_TO_PX_RATIO_FOR_PREVIEW}px;
    }
`;

const Data = styled.div`
    /**/
    border: 3px dotted #906090; /**/

    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    align-content: stretch;

    .datacell {
        /**/
        border: 1px dashed red; /**/

        width: 100px;
        height: 100px;
        overflow: hidden;
        padding: 10px;

        .qrcode {
            width: 50px !important;
            height: 50px !important;
        }
    }
`;

/**
 * TODO:
 * - Multiple file previews !!! Warn when more dropped
 */
