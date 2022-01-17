import React from 'react';
import { IFilePreviewer } from '../../IFilePreviewerProps';

export class CodeFilePreview implements IFilePreviewer {
    public isSupporting(file: File): boolean {
        return /^(application|text)\/.*/.test(file.type);
    }
    public async render(file: File) {
        return (
            <>
                <img
                    src={'./non-image-previews/code.jpg'}
                    alt={`Preview of ${file.name}`}
                    className={`file`}
                />
            </>
        );
    }
}
