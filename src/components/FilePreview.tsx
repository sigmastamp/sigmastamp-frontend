import React from 'react';
import styled from 'styled-components';
import { readFileAsDataUrl } from '../utils/readFileAsDataUri';
import { AsyncContentComponent } from './AsyncContentComponent';

interface FilePreviewProps {
    file: File;
}

export function FilePreview({ file }: FilePreviewProps) {
    return (
        <FilePreviewDiv>
            <AsyncContentComponent
                key={file.name}
                content={async () => {
                    const fileData = await readFileAsDataUrl(file);

                    if (/^image\/.*/.test(file.type)) {
                        return (
                            <img
                                src={fileData}
                                alt={`Preview of ${file.name}`}
                                className={`file`}
                            />
                        );
                    }
                    if (/^audio\/.*/.test(file.type)) {
                        // TODO: DRY
                        return (
                            <img
                                src={'./non-image-previews/audio.jpg'}
                                alt={`Preview of ${file.name}`}
                                className={`file`}
                            />
                        );
                    } else if (/^application\/.*/.test(file.type)) {
                        // TODO: DRY
                        return (
                            <img
                                src={'./non-image-previews/code.jpg'}
                                alt={`Preview of ${file.name}`}
                                className={`file`}
                            />
                        );
                    } else {
                        // TODO: DRY

                        console.warn(`Unknown file type "${file.type}"`);
                        return (
                            <img
                                src={'./non-image-previews/unknown.jpg'}
                                alt={`Preview of ${file.name}`}
                                className={`file`}
                            />
                        );
                    }
                }}
            />
        </FilePreviewDiv>
    );
}

const FilePreviewDiv = styled.div``;
