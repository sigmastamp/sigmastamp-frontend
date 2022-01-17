import React from 'react';
import { IFilePreviewer } from '../../IFilePreviewerProps';

export class UnknownFilePreview implements IFilePreviewer {
    public isSupporting(file: File): boolean {
        return true;
    }
    public async render(file: File) {
        console.warn(`Unknown file type "${file.type}"`);
        return (
            <img
                src={'./non-image-previews/unknown.jpg'}
                alt={`Preview of ${file.name}`}
                className={`file`}
            />
        );
    }
}
