import * as React from 'react';

export function Nl2br(props: { children: string }) {
    const lines = props.children.split('\n');
    return (
        <span>
            {lines.map((line, i) => (
                <React.Fragment key={i}>
                    {line}
                    {i < lines.length - 1 && <br />}
                </React.Fragment>
            ))}
        </span>
    );
}
