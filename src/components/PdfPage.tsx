import React from 'react';
import styled from 'styled-components';
import { Promisable } from 'type-fest';
import { PAGE_MM_TO_PX_RATIO, PAGE_SIZE } from '../config';
import { createPdf } from '../pdf/createPdf';

interface IPdfPageProps extends React.PropsWithChildren<{}> {
    renderUi: (options: {
        createPdf: () => Promise<Blob>;
    }) => Promisable<JSX.Element | JSX.Element[]>;
}

export function PdfPage(props: IPdfPageProps) {
    const pageRef = React.useRef<HTMLDivElement>(null);

    return (
        <PdfPageDiv>
            {props.renderUi({
                createPdf: async () => {
                    const containerElement = pageRef.current;

                    if (!containerElement) {
                        throw new Error('Problem with rendering to PDF.');
                    }

                    const pdfBlob = await createPdf(containerElement);

                    return pdfBlob;
                },
            })}
            <div className="preview" ref={pageRef}>
                {props.children}
            </div>
        </PdfPageDiv>
    );
}

const PdfPageDiv = styled.div`
    width: ${PAGE_SIZE.x * PAGE_MM_TO_PX_RATIO}px;

    .preview {
        //overflow: hidden;
        width: ${PAGE_SIZE.x * PAGE_MM_TO_PX_RATIO}px;
        height: ${PAGE_SIZE.y * PAGE_MM_TO_PX_RATIO}px;
        //box-shadow: #5e97ccb7 0px 0px 50px;

        background-color: white;
        color: black;

        /* Note: It the printed certificate there is better to use serif font */
        font-family: 'Times New Roman', Times, serif;
    }

    .preview img.logo {
        width: 50px;
        opacity: 0.5;
    }
`;
