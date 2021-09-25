import * as React from 'react';
import styled from 'styled-components';

export interface IPaymentGateProps {
    amount: number;
    address: string;
    dueTime: number /* TODOL Date */;
    //getStatus: () => Promise<boolean /* full status in future */>;
}

export function PaymentGate({
    amount,
    address,
    dueTime /*, getStatus*/,
}: IPaymentGateProps) {
    // TODO: !!! Deal up in design in superlong addreses like UegztxGAXchyKXtaZYFkGWxDnCpMD329qSNk4YVrc8wrwitM58WVocMT59rPSasNZJwezshytQ74pq9JF8uUGGYHJW64hbooxY54dDCRZnFVqFvXGcj1jUhkXpuYuVaDY1b6LcXq9zRCZCiXZ36Gswg2TqcgZRE1B5ZxUrKSd19XykEfsgx5eWW3k7MDiLxvisPqMxqpZtP8UHvgwucJxZ4Bg86xWC3v4kXVC6o9mkg7z64MqiQy1FrqHvY65mr7UgG1vK8q37mDcgZPkDc7BKmsKSLynXgDNsqT8yirvxmsCU9o5wMsF8BoFPxUnjPGLAp7yBwnqtvXowq3o4pYnc4h93irPEHqbTySBgLSEwFzgRgbVrXtE8FaL1q2LVyg7rbHJHzvjVfJMyQDSGQwecG6iWybNUv9sP7SKanHegS4wn8xKaBGrSmqTNk4aPpRXvGTr6rikYxmTYDmQru6tJSebRUf7mhsbtp3xTngEgFtPVCMQTnuuNtszbtHnMHGxfPntz8gEqfKFjHrM1LSCkWxuiYx92Nj7EHFY5vnM7
    return (
        <PaymentGateDiv>
            Pay {amount} ERG to address {address} in ${dueTime} seconds.
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
