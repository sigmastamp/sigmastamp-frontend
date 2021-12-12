import React, { useRef } from 'react';
import styled from 'styled-components';
import { Promisable } from 'type-fest';
import { PAGE_MM_TO_PX_RATIO, PAGE_SIZE } from '../config';
import { createPdf, IPdfTextMode } from '../pdf/createPdf';

interface IPdfPageProps extends React.PropsWithChildren<{}> {
    renderUi: (options: {
        createPdf: () => Promise<Blob>;
    }) => Promisable<JSX.Element | JSX.Element[]>;
}

export function PdfPage(props: IPdfPageProps) {
    const pageRef = useRef<HTMLDivElement>(null);

    return (
        <div>
            {props.renderUi({
                createPdf: async () => {
                    const containerElement = pageRef.current;

                    if (!containerElement) {
                        throw new Error('Problem with rendering to PDF.');
                    }

                    const pdfBlob = await createPdf({
                        containerElement,
                        textMode: IPdfTextMode.SELECTABLE_OVERLAY,
                        includeFullTextValue: true,
                    });

                    return pdfBlob;
                },
            })}
            <PdfPageDivPreview ref={pageRef}>
                {props.children}
            </PdfPageDivPreview>
        </div>
    );
}

const PdfPageDivPreview = styled.div`
    //overflow: hidden;
    width: ${PAGE_SIZE.x * PAGE_MM_TO_PX_RATIO}px;
    height: ${PAGE_SIZE.y * PAGE_MM_TO_PX_RATIO}px;
    box-shadow: #5e97ccb7 0px 0px 50px;

    background-color: white;
    color: black;

    // Note: !!!
    font-family: 'Times New Roman', Times, serif;
`;
