import React from 'react';
import { IFilePreviewer } from '../../IFilePreviewerProps';
import { ImageFilePreviewDiv } from '../image/ImageFilePreview';

export class CodeFilePreview implements IFilePreviewer {
    public isSupporting(file: File): boolean {
        return /^(application|text)\/.*/.test(file.type);
    }

    public async render(file: File) {
        return (
            // Note: Not using <img> because it doesn't stretch image propperly
            <ImageFilePreviewDiv fileData="./non-image-previews/code.jpg" />
        );
    }
}

/**
 * TODO: Generate better preview for code/text files
 */
