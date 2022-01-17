import React from 'react';
import styled from 'styled-components';
import { AsyncContentComponent } from '../components/AsyncContentComponent';
import { FILE_PREVIEWERS } from '../config';

interface ISingleFilePreviewProps {
    file: File;
}

export function SingleFilePreview({ file }: ISingleFilePreviewProps) {
    return (
        <SingleFilePreviewDiv>
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
        </SingleFilePreviewDiv>
    );
}

const SingleFilePreviewDiv = styled.div`
    width: 100%;
    height: 100%;
`;
