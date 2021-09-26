import QRCodeGenerator, { QRCodeRenderersOptions } from 'qrcode';
import * as React from 'react';

interface IQRCodeProps extends QRCodeRenderersOptions {
    text: string;
}

export function QRCode(props: IQRCodeProps) {
    return (
        <canvas
            ref={(canvasElement) => {
                if (!canvasElement) {
                    return;
                }

                // Note: Making some manipulation (probbably) due to internal errors of qrcode library
                const options: QRCodeRenderersOptions = { ...props };
                delete (options as any).text;
                options.color = options.color || {};

                QRCodeGenerator.toCanvas(canvasElement, props.text, options, (error) => {
                    if (error) {
                        console.error(error);
                    }
                    // console.log('success!');
                });
            }}
        />
    );
}
