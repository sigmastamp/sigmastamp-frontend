import * as React from 'react';
import { string_hex } from '../interfaces/stringTypes';

interface ISignatureComponentProps {
    width: number;
    height: number;
    data: string_hex;
}

export function SignatureComponent(props: ISignatureComponentProps) {
    const { width, height, data } = props;
    return (
        <svg {...{ width, height }} xmlns="http://www.w3.org/2000/svg">
            <path
                d="M 10 10 C 20 20, 40 20, 50 10"
                stroke="red"
                fill="transparent"
            />
        </svg>
    );
}

/**
 * TODO: Maybe place this into some separate file?
 */
