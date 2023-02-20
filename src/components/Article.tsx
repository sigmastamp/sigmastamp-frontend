import { Converter } from 'showdown';
import showdownHighlight from 'showdown-highlight';
import { spaceTrim } from 'spacetrim';
import styled from 'styled-components';
import { useAsyncMemo } from '../utils/useAsyncMemo';

interface IArticleProps {
    /**
     * Path to source markdown
     */
    src: string;
}

export function Article({ src }: IArticleProps) {
    const { error, content } = useAsyncMemo<{
        content: string | null;
        error: Error | null;
    }>(async () => {
        try {
            const response = await fetch(src);
            const mimeType = response.headers.get('content-type');

            if (!mimeType || !/^text\/markdown/.test(mimeType)) {
                return {
                    content: null,
                    error: new Error(
                        spaceTrim(`
                            Unexpected mime-type in article src
                            Fetching "${src}"
                            Expected "text/markdown" got "${mimeType}"
                        `),
                    ),
                };
            }

            return { content: await response.text(), error: null };
        } catch (error) {
            if (!(error instanceof Error)) {
                throw error;
            }
            return { content: null, error };
        }
    }, [src]) || { content: null, error: null };

    if (!error && !content) {
        return <>{/* TODO: Some loading */}</>;
    }

    if (error) {
        console.error(error);
        return <>{/* TODO: Some error indication */}</>;
    }

    const markdown = content;
    converter.setFlavor('github');
    const html = converter.makeHtml(markdown);

    return <ArticleDiv dangerouslySetInnerHTML={{ __html: html }} />;
}

const ArticleDiv = styled.div`
    /*/
    border: 1px dashed red;
    /**/

    img {
        max-width: 50%;
        max-height: 50%;
    }
`;

const converter = new Converter({
    extensions: [
        showdownHighlight({
            // Whether to add the classes to the <pre> tag, default is false
            pre: true,
            // Whether to use hljs' auto language detection, default is true
            auto_detection: true,
        }),
    ],
});
