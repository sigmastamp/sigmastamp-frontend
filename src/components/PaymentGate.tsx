import * as React from 'react';
import styled from 'styled-components';
import {
    ergo_wallet_address,
    nanoerg,
    seconds,
} from '../interfaces/stringTypes';
import { QRCode } from './QRCode';

export interface IPaymentGateProps {
    amount: nanoerg;
    address: ergo_wallet_address;
    dueTime: seconds /* TODOL Date */;
    //getStatus: () => Promise<boolean /* full status in future */>;
}

export function PaymentGate({
    amount,
    address,
    dueTime /*, getStatus*/,
}: IPaymentGateProps) {
    // TODO: !!! Deal up in design in superlong addreses like UegztxGAXchyKXtaZYFkGWxDnCpMD329qSNk4YVrc8wrwitM58WVocMT59rPSasNZJwezshytQ74pq9JF8uUGGYHJW64hbooxY54dDCRZnFVqFvXGcj1jUhkXpuYuVaDY1b6LcXq9zRCZCiXZ36Gswg2TqcgZRE1B5ZxUrKSd19XykEfsgx5eWW3k7MDiLxvisPqMxqpZtP8UHvgwucJxZ4Bg86xWC3v4kXVC6o9mkg7z64MqiQy1FrqHvY65mr7UgG1vK8q37mDcgZPkDc7BKmsKSLynXgDNsqT8yirvxmsCU9o5wMsF8BoFPxUnjPGLAp7yBwnqtvXowq3o4pYnc4h93irPEHqbTySBgLSEwFzgRgbVrXtE8FaL1q2LVyg7rbHJHzvjVfJMyQDSGQwecG6iWybNUv9sP7SKanHegS4wn8xKaBGrSmqTNk4aPpRXvGTr6rikYxmTYDmQru6tJSebRUf7mhsbtp3xTngEgFtPVCMQTnuuNtszbtHnMHGxfPntz8gEqfKFjHrM1LSCkWxuiYx92Nj7EHFY5vnM7

    const link = new URL(
        `https://explorer.ergoplatform.com/payment-request?address=${address}&amount=${
            amount / 1000000000
        }`,
    );

    // TODO: !!! Countdown and show minutes
    return (
        <PaymentGateDiv>
            <QRCode {...{ link }} />
            Pay {amount / 1000000000} ERG to address{' '}
            <a href={link.href} target="_blank" rel="noopener noreferrer">
                {address}
            </a>
            in {dueTime} seconds.
            {/*<button
                onClick={async () => {
                    const status = await getStatus();
                    if (status) {
                        alert(`Payed`)!;
                    }
                }}
            ></button>*/}
        </PaymentGateDiv>
    );
}

const PaymentGateDiv = styled.div`
    font-size: 11px;
    width: 500px;
`;
