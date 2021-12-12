import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { forAllImagesInElement, forEver } from 'waitasecond';
import { Vector } from 'xyzt';
import { PAGE_DEBUG, PAGE_MM_TO_PX_RATIO, PAGE_SIZE } from '../config';
import { findDeepestChild } from '../utils/findDeepestChild';

interface IPdfOptions {
    containerElement: HTMLElement;
    textMode: IPdfTextMode;
}

export enum IPdfTextMode {
    /**
     * Text is rendered into image and it IS NOT selectable.
     */
    NO_TEXT,

    /**
     * Text is rendered into image and also there is selectable overlay to allow text selection.
     */
    SELECTABLE_OVERLAY,

    /**
     * Text is NOT rendered into image and it is replaced by same text in the PDF.
     */
    REPLACE_BY_TEXT,

    /**
     * Text is rendered BOTH into image and PDF.
     * Note: Use this only for testing purposes because texts could have some small ugly looking offset.
     */
    DEBUG_BOTH,
}

export async function createPdf({
    containerElement,
    textMode,
}: IPdfOptions): Promise<Blob> {
    const pdfDocument = new jsPDF('p', 'mm', PAGE_SIZE.toArray2D());
    // TODO: !!! Add metadata to PDF

    await forAllImagesInElement(containerElement);

    const textElements = Array.from(
        containerElement.querySelectorAll('.render-as-text'),
    ) as HTMLElement[];

    if (textMode === IPdfTextMode.REPLACE_BY_TEXT) {
        for (const textElement of textElements) {
            textElement.style.visibility = 'hidden';
        }
    }

    const canvas = await html2canvas(containerElement, {
        scale: 3 /* TODO: What is the ideal quality */,
        backgroundColor: 'trasparent',
        allowTaint: true,
        // removeContainer: true,
        /*ignoreElements: (element) => {
            if (PAGE_DEBUG) {
                return false;
            } else {
                return element.classList.contains('render-as-text');
            }
        },*/
    });

    if (textMode === IPdfTextMode.REPLACE_BY_TEXT) {
        for (const textElement of textElements) {
            textElement.style.visibility = 'visible';
        }
    }

    const image = canvas.toDataURL('image/png' /* TODO: Configure quality */);

    if (PAGE_DEBUG) {
        canvas.style.width = PAGE_SIZE.x * PAGE_MM_TO_PX_RATIO + 'px';
        canvas.style.height = PAGE_SIZE.y * PAGE_MM_TO_PX_RATIO + 'px';
        canvas.style.border = '1px solid red';
        canvas.style.position = 'fixed';
        canvas.style.bottom = '20px';
        canvas.style.right = '20px';
        document.body.appendChild(canvas);
    }

    pdfDocument.addImage(
        // TODO: !!! Conpression and metadata
        image,
        'JPEG',
        0,
        0,
        ...PAGE_SIZE.toArray2D(),
    );

    const containerBoundingBox = containerElement.getBoundingClientRect();
    const originPosition = Vector.fromObject(containerBoundingBox, [
        'left',
        'top',
    ]);
    const containerSize = Vector.fromObject(containerBoundingBox, [
        'width',
        'height',
    ]);

    if (textMode !== IPdfTextMode.NO_TEXT) {
        pdfDocument.addFont('Times New Roman', 'Times', 'serif');
        // TODO: Remove unnessesary fonts from the document
        //   console.log(pdfDocument.getFontList());

        for (const textElement of textElements) {
            const positionInPdf = Vector.fromObject(
                textElement.getBoundingClientRect(),
                ['left', 'top'],
            )
                .subtract(originPosition)
                .divide(containerSize)
                .multiply(PAGE_SIZE)
                .add(new Vector(0, 0.5));

            const textElementDeepestChild = findDeepestChild(textElement);

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
                fontSize * (PAGE_SIZE.y / containerSize.y) * 2.83464566929;

            pdfDocument.setFontSize(fontSizeInPdf);

            pdfDocument.setFont('Times', fontStyle);
            pdfDocument.text(
                textElement.innerText,
                ...positionInPdf.toArray2D(),
                {
                    baseline: 'top',
                    renderingMode:
                        textMode === IPdfTextMode.SELECTABLE_OVERLAY
                            ? 'addToPathForClipping'
                            : 'fill',
                },
            );
            // console.log(textElement.innerText, ...positionInPdf.toArray2D());
        }
    }

    if (PAGE_DEBUG) {
        pdfDocument.save('test.pdf');
        // TODO: Maybe debug throught new tab> console.log(pdfDocument.output('datauri'));
        await forEver();
    }

    return pdfDocument.output('blob');
}
