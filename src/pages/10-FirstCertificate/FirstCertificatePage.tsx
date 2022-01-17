import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IPaymentGateProps, PaymentGate } from '../../components/PaymentGate';
import { UploadZone } from '../../components/UploadZone';
import { UploadZoneSigmastampContent } from '../../components/UploadZoneSigmastampContent';
import { ROUTES } from '../../config';
import { FirstCertificatePdfPage } from './FirstCertificatePdfPage';

interface IAppState {
    files: File[];
}

export function FirstCertificatePage() {
    const [state, setState] = useState<IAppState>({ files: [] });
    const [payment, setPayment] = useState<null | IPaymentGateProps>(null);

    if (!payment) {
        return (
            <>
                {/*
                <Button
                onClick={() => { console.log('test'); createCertificate() }}
                >
                Create document
                </Button>
                    <h1>Sigmastamp</h1>*/}

                {state.files.length === 0 ? (
                    <UploadZone
                        onFiles={async (files) => {
                            setState({ files });
                            /*
                            const file = files[0];

                            const hash = await blake2b256(file);

                            console.log({ files, file, hash });

                            const certificateFile = createCertificate({ certificateFilename: 'certificate.pdf', hash });

                            const zip = new JSZip();
                            zip.file(file.name, file);
                            zip.file(certificateFile.name, certificateFile);

                            const zipFile = await zip.generateAsync({ type: 'blob' });
                            saveAs(zipFile, 'certificate.zip');
                            */
                        }}
                        clickable
                    >
                        <UploadZoneSigmastampContent>
                            Drop the files you want to timestamp here!
                        </UploadZoneSigmastampContent>
                    </UploadZone>
                ) : (
                    <FirstCertificatePdfPage
                        files={state.files}
                        setPayment={setPayment}
                    />
                )}

                <Link to={ROUTES.SecondCertificate}>
                    Or verify your 1st certificate.
                </Link>
            </>
        );
    } else {
        return <PaymentGate {...payment} />;
    }
}

/**
 * TODO: When the user is in the middle of the process, prevent unloading of the page (or the component) by "unsubmitted form" feature of the browser
 */
