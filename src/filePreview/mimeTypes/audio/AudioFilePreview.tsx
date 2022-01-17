import React from 'react';
import { IFilePreviewer } from '../../IFilePreviewerProps';

export class AudioFilePreview implements IFilePreviewer {
    public isSupporting(file: File): boolean {
        return /^audio\/.*/.test(file.type);
    }
    public async render(file: File) {
        return (
            <img
                src={'./non-image-previews/audio.jpg'}
                alt={`Preview of ${file.name}`}
                className={`file`}
            />
        );
    }
}
