import React from 'react';
import styled from 'styled-components';
import { AsyncContentComponent } from '../components/AsyncContentComponent';
import { FILE_PREVIEWERS } from '../config';

interface FilePreviewProps {
    file: File;
}

export function FilePreview({ file }: FilePreviewProps) {
    return (
        <FilePreviewDiv>
            <AsyncContentComponent
                key={file.name}
                content={async () => {
                    for (const filePreviewer of FILE_PREVIEWERS) {
                        if (filePreviewer.isSupporting(file)) {
                            return await filePreviewer.render(file);
                        }
                    }

                    // Note: This should never happen, because UnknownFilePreview will support everything
                    return <>No preview available</>;
                }}
            />
        </FilePreviewDiv>
    );
}

const FilePreviewDiv = styled.div`
    img {
        width: 100%;
    }
`;
