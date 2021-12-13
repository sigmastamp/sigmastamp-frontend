import * as React from 'react';
import { Vector } from 'xyzt';
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
                d={Array.from(Array(width))
                    .map((_, i) => {
                        const point = new Vector(
                            i,
                            ((Math.sin(i / 5) + 1) / 2) * height,
                        );

                        if (i === 0) {
                            return `M ${point.toArray2D().join(',')}`;
                        } else {
                            return `Q ${point.toArray2D().join(',')} ${point
                                .add(new Vector(50, 10))
                                .toArray2D()
                                .join(',')}`;
                            //return `L ${point.toArray2D().join(',')}`;
                        }
                    })
                    .join(' ')}
                stroke="black"
                fill="transparent"
            />
        </svg>
    );
}

/**
 * TODO: Maybe place this into some separate file?
 */
