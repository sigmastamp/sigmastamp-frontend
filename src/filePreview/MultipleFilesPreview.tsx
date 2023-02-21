import styled from 'styled-components';
import { SingleFilePreview } from './SingleFilePreview';

interface IMultipleFilesPreviewProps {
    files: File[];
}

export function MultipleFilesPreview({ files }: IMultipleFilesPreviewProps) {
    return (
        <MultipleFilesPreviewDiv filesCount={files.length}>
            {files.map((file) => (
                <div key={file.name} className="file-mask">
                    <div className="file-container">
                        <SingleFilePreview file={file} />
                    </div>
                </div>
            ))}
        </MultipleFilesPreviewDiv>
    );
}

const MultipleFilesPreviewDiv = styled.div<{ filesCount: number }>`
    display: flex;
    flex-direction: row;
    align-content: stretch;
    justify-content: stretch;

    width: 100%;
    height: 100%;

    .file-mask {
        /*/
        outline: 1px dashed red; /**/

        overflow: hidden;
        width: ${({ filesCount }) => 100 / filesCount}%;
        height: 100%;
    }

    .file-container {
        /*/
        outline: 1px dashed red; /**/

        align-self: stretch;

        width: 100%;
        height: 100%;
    }
`;
