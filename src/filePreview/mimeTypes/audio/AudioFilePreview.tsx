import React from 'react';
import { IFilePreviewer } from '../../IFilePreviewerProps';
import { ImageFilePreviewDiv } from '../image/ImageFilePreview';

export class AudioFilePreview implements IFilePreviewer {
    public isSupporting(file: File): boolean {
        return /^audio\/.*/.test(file.type);
    }
    public async render(file: File) {
        return (
            // Note: Not using <img> because it doesn't stretch image propperly
            <ImageFilePreviewDiv fileData="./non-image-previews/audio.jpg" />
        );
    }
}


/**
 * TODO: Generate better preview for audio files
 */