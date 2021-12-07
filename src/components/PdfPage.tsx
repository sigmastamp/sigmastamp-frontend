import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import React, { useRef } from 'react';
import styled from 'styled-components';
import { Promisable } from 'type-fest';
import { forEver } from 'waitasecond';
import { Vector } from 'xyzt';
import { PAGE_CM_TO_PX_RATIO, PAGE_DEBUG, PAGE_SIZE } from '../config';

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
                    const pdfDocument = new jsPDF(
                        'p',
                        'mm',
                        PAGE_SIZE.toArray2D(),
                    );

                    // TODO: !!! Add metadata to PDF

                    const containerElement = pageRef.current;

                    if (!containerElement) {
                        throw new Error('Problem with rendering to PDF.');
                    }

                    const canvas = await html2canvas(containerElement, {
                        backgroundColor: 'trasparent',
                        //foreignObjectRendering: true,
                        allowTaint: true,
                        ignoreElements: (element) => {
                            if (PAGE_DEBUG) {
                                return false;
                            } else {
                                return element.classList.contains(
                                    'render-as-text',
                                );
                            }
                        },
                    });
                    const image = canvas.toDataURL();

                    if (PAGE_DEBUG) {
                        canvas.style.border = '1px solid red';
                        canvas.style.position = 'fixed';
                        canvas.style.bottom = '20px';
                        canvas.style.right = '20px';
                        document.body.appendChild(canvas);
                    }

                    pdfDocument.addImage(
                        image,
                        'JPEG',
                        0,
                        0,
                        ...PAGE_SIZE.toArray2D(),
                    );

                    const containerBoundingBox =
                        containerElement.getBoundingClientRect();
                    const originPosition = Vector.fromObject(
                        containerBoundingBox,
                        ['left', 'top'],
                    );
                    const containerSize = Vector.fromObject(
                        containerBoundingBox,
                        ['width', 'height'],
                    );

                    pdfDocument.addFont('Times New Roman', 'Times', 'serif');

                    for (const textElement of Array.from(
                        containerElement.querySelectorAll('.render-as-text'),
                    ) as HTMLElement[]) {
                        const positionInPdf = Vector.fromObject(
                            textElement.getBoundingClientRect(),
                            ['left', 'top'],
                        )
                            .subtract(originPosition)
                            .divide(containerSize)
                            .multiply(PAGE_SIZE)
                            .add(new Vector(0, 0.5));

                        const textElementDeepestChild =
                            textElement.children[0]!;

                        const fontSize = parseFloat(
                            window
                                .getComputedStyle(textElementDeepestChild, null)
                                .getPropertyValue('font-size'),
                        );

                        const fontWeight = parseFloat(
                            window
                                .getComputedStyle(textElementDeepestChild, null)
                                .getPropertyValue('font-weight'),
                        );

                        const fontStyle = fontWeight > 400 ? 'bold' : 'normal';

                        const fontSizeInPdf =
                            fontSize *
                            (PAGE_SIZE.y / containerSize.y) *
                            2.83464566929;

                        pdfDocument.setFontSize(fontSizeInPdf);
                        pdfDocument.setFont('Times New Roman', fontStyle);
                        pdfDocument.text(
                            textElement.innerText,
                            ...positionInPdf.toArray2D(),
                            {
                                baseline: 'top',
                            },
                        );

                        console.log(
                            textElement.innerText,
                            ...positionInPdf.toArray2D(),
                        );
                    }

                    /*
                    doc.html((pageRef!.current as any).innerHTML, {
                        x: 10,
                        y: 10,
                    });

                    console.log(pageRef!.current as any);
                    console.log((pageRef!.current as any).innerText);
                    doc.html((pageRef!.current as any).innerHTML, {
                        x: 10,
                        y: 10,
                    });
                    doc.text((pageRef!.current as any).innerText, 10, 10);
                    */

                    // TODO: !! Toggle PDF dev testing
                    pdfDocument.save('test.pdf');
                    await forEver();

                    return pdfDocument.output('blob');
                },
            })}
            <PdfPageDiv ref={pageRef}>{props.children}</PdfPageDiv>
        </div>
    );
}

const PdfPageDiv = styled.div`
    // Note: !!!
    font-family: 'Times New Roman', Times, serif;

    width: ${PAGE_SIZE.x * PAGE_CM_TO_PX_RATIO}px;
    height: ${PAGE_SIZE.y * PAGE_CM_TO_PX_RATIO}px;
    box-shadow: #5e97ccb7 0px 0px 50px;

    background-color: white;
    color: black;
`;
