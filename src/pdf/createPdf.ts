import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { forAllImagesInElement, forEver } from 'waitasecond';
import { Vector } from 'xyzt';
import {
    PAGE_DEBUG,
    PAGE_MM_TO_PX_RATIO_FOR_PREVIEW,
    PAGE_MM_TO_PX_RATIO_FOR_RENDER,
    PAGE_SIZE,
} from '../config';
import { findDeepestChild } from '../utils/findDeepestChild';

export async function createPdf(containerElement: HTMLElement): Promise<Blob> {
    const pdfDocument = new jsPDF('p', 'mm', PAGE_SIZE.toArray2D());
    // TODO: !!! Add metadata to PDF

    await forAllImagesInElement(containerElement);

    const canvas = await html2canvas(containerElement, {
        backgroundColor: 'trasparent',
        allowTaint: true,
        // removeContainer: true,
        ignoreElements: (element) => {
            if (PAGE_DEBUG) {
                return false;
            } else {
                return element.classList.contains('render-as-text');
            }
        },
    });

    const image = canvas.toDataURL('image/png' /* TODO: Configure quality */);

    if (PAGE_DEBUG) {
        canvas.style.width =
            PAGE_SIZE.x * PAGE_MM_TO_PX_RATIO_FOR_PREVIEW + 'px';
        canvas.style.height =
            PAGE_SIZE.y * PAGE_MM_TO_PX_RATIO_FOR_PREVIEW + 'px';
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

    pdfDocument.addFont('Times New Roman', 'Times', 'serif');
    // TODO: Remove unnessesary fonts from the document
    //   console.log(pdfDocument.getFontList());

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
            fontSize *
            (PAGE_SIZE.y / containerSize.y) *
            (PAGE_MM_TO_PX_RATIO_FOR_RENDER / PAGE_MM_TO_PX_RATIO_FOR_PREVIEW) *
            2.83464566929;

        pdfDocument.setFontSize(fontSizeInPdf);

        pdfDocument.setFont('Times', fontStyle);
        pdfDocument.text(textElement.innerText, ...positionInPdf.toArray2D(), {
            baseline: 'top',
        });

        // console.log(textElement.innerText, ...positionInPdf.toArray2D());
    }

    // containerElement.style.display = 'none';

    if (PAGE_DEBUG) {
        pdfDocument.save('test.pdf');
        // TODO: Maybe debug throught new tab> console.log(pdfDocument.output('datauri'));
        await forEver();
    }

    return pdfDocument.output('blob');
}
