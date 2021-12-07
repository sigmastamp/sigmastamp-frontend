import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import React, { PropsWithChildren } from 'react';
import { Textfit } from 'react-textfit';
import styled from 'styled-components';
import { AsyncContentComponent } from '../../components/AsyncContentComponent';
import { Button } from '../../components/Button';
import { IPaymentGateProps } from '../../components/PaymentGate';
import { PdfPage } from '../../components/PdfPage';
import { ORACLES, PAGE_CM_TO_PX_RATIO } from '../../config';
import { blake2b256 } from '../../hash/blake2b256';
import { string_base64, string_hex } from '../../interfaces/stringTypes';
import { IOracle } from '../../oracles/_IOracle';
import { createSigmaStampNFT } from '../../smartcontracts/createSigmaStampNFT';
import { hexToBase64 } from '../../utils/hexToBase64';
import { promptAsync } from '../../utils/promptAsync';
import { readFileAsDataUrl } from '../../utils/readFileAsDataUri';

interface IFirstCertificatePdfPageProps {
    files: File[];
    setPayment: (v: IPaymentGateProps) => void;
}

export function FirstCertificatePdfPage(props: IFirstCertificatePdfPageProps) {
    const { files, setPayment } = props;

    return (
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
                                `certificate1.${zipHash.substring(0, 5)}.zip`,
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
            {files.map((file) => (
                <Preview key={file.name}>
                    <AsyncContentComponent
                        content={readFileAsDataUrl(file).then((data) => (
                            <img src={data} alt={`Preview of ${file.name}`} />
                        ))}
                    />
                </Preview>
            ))}

            {files.map((file) => (
                <AsyncContentComponent
                    key={file.name}
                    content={async () => {
                        const hash = await blake2b256(file);
                        return (
                            <Pair>
                                <Key>{`Hash of ${file.name}: `}</Key>
                                <Value>{hash}</Value>
                            </Pair>
                        );
                    }}
                />
            ))}

            {ORACLES.map((oracle) => (
                <div key={oracle.name}>
                    <AsyncContentComponent
                        content={async () => {
                            const data = await oracle.getData();

                            return (
                                <>
                                    {Object.entries(data).map(
                                        ([key, value]) => (
                                            <Pair key={key}>
                                                <Key>
                                                    {`${oracle.title} ${
                                                        (oracle as IOracle<any>)
                                                            .dataTitles[key]
                                                    }: `}
                                                </Key>
                                                <Value>{value}</Value>
                                            </Pair>
                                        ),
                                    )}
                                </>
                            );
                        }}
                    />
                </div>
            ))}
        </PdfPage>
    );
}

const Preview = styled.div`
    img {
        max-width: 100%;
        max-height: ${300 * PAGE_CM_TO_PX_RATIO}px;
    }
`;

const Pair = styled.div``;

function Key(props: PropsWithChildren<{}>) {
    return (
        <div className="render-as-text">
            <b>{props.children}</b>
        </div>
    );
}

function Value(props: PropsWithChildren<{}>) {
    return (
        <div className="render-as-text">
            <Textfit mode="single" max={20}>
                {props.children}
            </Textfit>
        </div>
    );
}
