import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Promisable } from 'type-fest';
import {
    PAGE_MM_TO_PX_RATIO_FOR_PREVIEW,
    PAGE_MM_TO_PX_RATIO_FOR_RENDER,
    PAGE_SIZE,
} from '../config';
import { createPdf } from '../pdf/createPdf';

interface IPdfPageProps extends React.PropsWithChildren<{}> {
    renderUi: (options: {
        createPdf: () => Promise<Blob>;
    }) => Promisable<JSX.Element | JSX.Element[]>;
}

export function PdfPage(props: IPdfPageProps) {
    const [isRendering, setIsRendering] = useState<boolean>(false);
    const pageRef = useRef<HTMLDivElement>(null);

    return (
        <div>
            {props.renderUi({
                createPdf: async () => {
                    const containerElement = pageRef.current;

                    if (!containerElement) {
                        throw new Error('Problem with rendering to PDF.');
                    }

                    setIsRendering(true);
                    const pdfBlob = await createPdf(containerElement);
                    setIsRendering(false);

                    return pdfBlob;
                },
            })}
            <PdfPageDivPreview>{props.children}</PdfPageDivPreview>
            <PdfPageDivRender
                ref={pageRef}
                style={{ display: isRendering ? 'block' : 'none' }}
            >
                {props.children}
            </PdfPageDivRender>
        </div>
    );
}

const PdfPageDivPreview = styled.div`
    //overflow: hidden;
    width: ${PAGE_SIZE.x * PAGE_MM_TO_PX_RATIO_FOR_PREVIEW}px;
    height: ${PAGE_SIZE.y * PAGE_MM_TO_PX_RATIO_FOR_PREVIEW}px;
    box-shadow: #5e97ccb7 0px 0px 50px;

    background-color: white;
    color: black;

    // Note: !!!
    font-family: 'Times New Roman', Times, serif;
`;

const PdfPageDivRender = styled.div`
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 333vw;

    width: ${PAGE_SIZE.x * PAGE_MM_TO_PX_RATIO_FOR_PREVIEW}px;
    height: ${PAGE_SIZE.y * PAGE_MM_TO_PX_RATIO_FOR_PREVIEW}px;

    transform: scale(
        ${PAGE_MM_TO_PX_RATIO_FOR_RENDER / PAGE_MM_TO_PX_RATIO_FOR_PREVIEW}
    );

    background-color: white;
    color: black;

    // Note: !!!
    font-family: 'Times New Roman', Times, serif;
`;
