import * as React from 'react';
import styled from 'styled-components';

export interface IPaymentGateProps {
    amount: number;
    address: string;
    dueTime: number /* TODOL Date */;
    //getStatus: () => Promise<boolean /* full status in future */>;
}

export function PaymentGate({ amount, address, dueTime /*, getStatus*/ }: IPaymentGateProps) {
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

const PaymentGateDiv = styled.div``;
