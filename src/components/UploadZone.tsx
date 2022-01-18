import React from 'react';
import styled from 'styled-components';
import { PAGE_MM_TO_PX_RATIO } from '../config';
import { Center } from './Center';

export type IUploadZoneProps = React.PropsWithChildren<{
    clickable?: boolean;
    onFilesOver?: (isFileOver: boolean) => void;
    onFiles: (droppedFiles: File[]) => void;
}>;

export function UploadZone({
    children,
    clickable,
    onFilesOver,
    onFiles,
}: IUploadZoneProps) {
    const [isFilesOver, setFilesOver] = React.useState(false);

    const onFileOverWrapper = (isFileOver: boolean) => {
        setFilesOver(isFileOver);

        if (onFilesOver) {
            onFilesOver(isFileOver);
        }
    };

    let uploadClick: () => void;

    return (
        <UploadZoneDiv
            className={isFilesOver ? 'files-over' : ''}
            onClick={() => {
                if (clickable) {
                    uploadClick();
                }
            }}
            onMouseEnter={() => {
                onFileOverWrapper(true);
            }}
            onMouseLeave={() => {
                onFileOverWrapper(false);
            }}
            onDragEnter={(event) => {
                event.stopPropagation();
                event.preventDefault();
            }}
            onDragOver={(event) => {
                event.stopPropagation();
                event.preventDefault();
                onFileOverWrapper(true);
            }}
            onDragExit={(event) => {
                event.stopPropagation();
                event.preventDefault();
                onFileOverWrapper(false);
            }}
            onDragEnd={(event) => {
                event.stopPropagation();
                event.preventDefault();
                onFileOverWrapper(false);
            }}
            onDragEndCapture={(event) => {
                event.stopPropagation();
                event.preventDefault();
                onFileOverWrapper(false);
            }}
            onDrop={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onFileOverWrapper(false);

                const files = Array.from(event.dataTransfer.files); // TODO: Maybe there should be event.dataTransfer.items handler
                onFiles(files);
            }}
        >
            <input
                type="file"
                ref={(element) => {
                    if (element) {
                        uploadClick = () => {
                            onFileOverWrapper(true);
                            (element as HTMLInputElement).click();
                        };
                    }
                }}
                onChange={(event) => {
                    if (!event || !event.target || !event.target.files) return;
                    onFiles(Array.from(event.target.files));
                }}
            />
            <Center className={'upload-inner'}>{children}</Center>
        </UploadZoneDiv>
    );
}

const PADDING = 100;
const UploadZoneDiv = styled.div`
    width: ${210 * PAGE_MM_TO_PX_RATIO - 2 * PADDING}px;
    height: ${297 * PAGE_MM_TO_PX_RATIO - 2 * PADDING}px;
    padding: ${PADDING}px;
    border: 5px dashed #cccccc;
    border-radius: 5px;

    input {
        display: none;
    }

    transition: border-color 0.2s ease;
    .upload-inner {
        transition: transform 0.1s ease;
    }

    &.files-over {
        border-color: #009edf;
    }

    &.files-over .upload-inner {
        transform: scale(105%);
    }
`;

/**
 * TODO: Probbably when there is only one UploadZone rendered on entire page, expand invisible dropzone to full page
 * TODO: Do not allow to drop placeholder of SigmaStamp logo
 */
