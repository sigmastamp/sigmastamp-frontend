import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styled from 'styled-components';
import { readFileAsText } from '../../../utils/readFileAsText';
import { IFilePreviewer } from '../../IFilePreviewerProps';

export class CodeFilePreview implements IFilePreviewer {
    public isSupporting(file: File): boolean {
        return /^(application|text)\/.*/.test(file.type);
    }

    public async render(file: File) {
        const fileData = await readFileAsText(file);
        return (
            <CodeFilePreviewDiv>
                <SyntaxHighlighter
                    language="javascript"
                    style={dark}
                    showLineNumbers={true}
                >
                    {fileData}
                </SyntaxHighlighter>
            </CodeFilePreviewDiv>
        );
    }
}

const CodeFilePreviewDiv = styled.div`

    height: 100%;

    pre {
        height: 100%;
        margin: 0!important;
        padding: 0.2em;!important;
        border: none!important;
        box-shadow:none !important;
        border-radius: 0 !important;
    }

    .linenumber {
        min-width: 0 !important;
    }
`;

/**
 * TODO: Dynamically choose language
 */
