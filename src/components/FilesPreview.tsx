import React from 'react';
import { FilePreview } from './FilePreview';

interface FilesPreviewProps {
    files: File[];
}

export function FilesPreview({ files }: FilesPreviewProps) {
    const file = files[0];
    // TODO: Now support only one file - make it to support multiple files and show multiple previews

    return <FilePreview file={file} />;
}
