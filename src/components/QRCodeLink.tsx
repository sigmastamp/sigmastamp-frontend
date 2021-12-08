import { QRCodeRenderersOptions } from 'qrcode';
import * as React from 'react';
import { QRCode } from './QRCode';

interface IQRCodeLinkProps extends QRCodeRenderersOptions {
    link: URL;
}

export function QRCodeLink(props: IQRCodeLinkProps) {
    const href = props.link.href;

    return (
        <a {...{ href }} target="_blank" rel="noopener noreferrer">
            <QRCode text={href} />
        </a>
    );
}
