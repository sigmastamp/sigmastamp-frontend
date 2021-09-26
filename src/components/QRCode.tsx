import QRCodeGenerator, { QRCodeRenderersOptions } from 'qrcode';
import * as React from 'react';

interface IQRCodeProps extends QRCodeRenderersOptions {
    link: URL;
}

export function QRCode(props: IQRCodeProps) {
    const href = props.link.href;

    return (
        <a {...{ href }} target="_blank" rel="noopener noreferrer">
            <canvas
                ref={(canvasElement) => {
                    if (!canvasElement) {
                        return;
                    }

                    // Note: Making some manipulation (probbably) due to internal errors of qrcode library
                    const options: QRCodeRenderersOptions = { ...props };
                    delete (options as any).href;
                    options.color = options.color || {};

                    QRCodeGenerator.toCanvas(
                        canvasElement,
                        href,
                        options,
                        (error) => {
                            if (error) {
                                console.error(error);
                            }
                            // console.log('success!');
                        },
                    );
                }}
            />
        </a>
    );
}
