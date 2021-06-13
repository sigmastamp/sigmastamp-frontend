import { jsPDF } from "jspdf";

interface ICreateCertificateOptions {
    hash: string;
}

// TODO: Should return file not download
export function createCertificate({ hash }: ICreateCertificateOptions) {
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();

    doc.text(`Your BLAKE2s file hash is:\n${hash}`, 10, 10);

    doc.save("a4.pdf");

}