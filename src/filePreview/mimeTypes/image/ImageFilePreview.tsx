import React from 'react';
import styled from 'styled-components';
import { string_data_url } from '../../../interfaces/stringTypes';
import { readFileAsDataUrl } from '../../../utils/readFileAsDataUri';
import { IFilePreviewer } from '../../IFilePreviewerProps';

export class ImageFilePreview implements IFilePreviewer {
    public isSupporting(file: File): boolean {
        return /^image\/.*/.test(file.type);
    }
    public async render(file: File) {
        const fileData = await readFileAsDataUrl(file);
        return (
            // Note: Not using <img> because it doesn't stretch image propperly
            <ImageFilePreviewDiv {...{ fileData }} />
        );
    }
}

export const ImageFilePreviewDiv = styled.div<{ fileData: string_data_url }>`
    width: 100%;
    height: 100%;
    background-color: #000;
    background-image: url(${({ fileData }) => fileData});
    background-size: cover;
    background-position: center center;
`;
