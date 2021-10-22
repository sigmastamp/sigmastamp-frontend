import { jsPDF } from 'jspdf';

interface ICreateCertificateOptions {
    certificateFilename: string;
    hash: string;
}

// TODO @hejny - design some better looking PDF format
// TODO @hejny & @nitram147 - decide about graphical hash representation
// TODO @hejny & @nitram147 - decide what to include in certificates...

// TODO: Maybe should return Blob
export function createCertificate({
    certificateFilename,
    hash,
}: ICreateCertificateOptions) {
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();

    doc.text(`Your BLAKE2b file hash is:\n${hash}`, 10, 10);

    const blob = doc.output('blob');

    return new File(
        [blob],
        certificateFilename /* TODO: Maybe add current {lastModified: 1534584790000}*/,
    );
}
