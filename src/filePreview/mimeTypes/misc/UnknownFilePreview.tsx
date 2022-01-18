import React from 'react';
import { IFilePreviewer } from '../../IFilePreviewerProps';
import { ImageFilePreviewDiv } from '../image/ImageFilePreview';

export class UnknownFilePreview implements IFilePreviewer {
    public isSupporting(file: File): boolean {
        return true;
    }

    public async render(file: File) {
        return (
            // Note: Not using <img> because it doesn't stretch image propperly
            <ImageFilePreviewDiv fileData="./non-image-previews/unknown.jpg" />
        );
    }
}

/**
 * TODO: @hejny Better preview for unknown files
 */
