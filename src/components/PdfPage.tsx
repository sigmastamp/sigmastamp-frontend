import React, { useRef } from 'react';
import styled from 'styled-components';
import { IAwaitable } from './AsyncContentComponent';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface PdfPage extends React.PropsWithChildren<{}> {
    createUi: (options: { createPdf: () => Promise<Blob> }) => IAwaitable<JSX.Element | JSX.Element[]>;
}

export function PdfPage(props: PdfPage) {
    const pageRef = useRef(null);

    return (
        <div>
            {props.createUi({
                createPdf: async () => {
                    const doc = new jsPDF();

                    // TODO: !!! Through nice html2canvas

                    const canvas = await html2canvas(pageRef!.current!);
                    const image = canvas.toDataURL();

                    // !!! document.body.appendChild(canvas);

                    doc.addImage(image, 'JPEG', 0, 0, 210, 297);
                    //doc.text(`Your BLAKE2b file hash is`, 10, 10);

                    return doc.output('blob');
                },
            })}
            <PdfPageDiv ref={pageRef}>{props.children}</PdfPageDiv>
        </div>
    );
}

const PdfPageDiv = styled.div`
    width: ${210 * 2}px;
    height: ${297 * 2}px;
    border: 2px solid #009edf;

    background-color: white;
    color: black;

    button {
    }
`;
