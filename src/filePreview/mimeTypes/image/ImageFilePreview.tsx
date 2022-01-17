import React from 'react';
import { readFileAsDataUrl } from '../../../utils/readFileAsDataUri';
import { IFilePreviewer } from '../../IFilePreviewerProps';

export class ImageFilePreview implements IFilePreviewer {
    public isSupporting(file: File): boolean {
        return /^image\/.*/.test(file.type);
    }
    public async render(file: File) {
        const fileData = await readFileAsDataUrl(file);
        return (
            <img
                src={fileData}
                alt={`Preview of ${file.name}`}
                className={`file`}
            />
        );
    }
}
