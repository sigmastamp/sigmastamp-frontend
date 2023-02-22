import { Converter } from 'showdown';
import showdownHighlight from 'showdown-highlight';
import { spaceTrim } from 'spacetrim';
import styled from 'styled-components';
import { addTooltipToLinks } from '../utils/addTooltipToLinks';
import { useAsyncMemo } from '../utils/useAsyncMemo';
import { useHash } from '../utils/useHash';

interface IArticleProps {
    /**
     * Path to source markdown
     */
    src: string;
}

export function Article({ src }: IArticleProps) {
    const hash = useHash();
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

    const currentSubsection = hash.substring(1);

    return (
        <>
            <ArticleDiv
                dangerouslySetInnerHTML={{ __html: html }}
                ref={(element) => {
                    if (!element) {
                        return;
                    }

                    if (currentSubsection) {
                        const section = element.querySelector(
                            `#${currentSubsection}`,
                        );

                        if (section) {
                            section.scrollIntoView(true);
                        }
                    }

                    addTooltipToLinks(element);
                }}
            />
            <style>
                {!currentSubsection
                    ? ``
                    : `
                        #${currentSubsection}{
                          color: #1b73f7;
                        }

                        /*
                        TODO: Also all items to the next heading
                        #${currentSubsection} + * {
                          color: red;
                        }
                        */

              `}
            </style>
        </>
    );
}

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

const ArticleDiv = styled.div`
    /*/
    outline: 1px dashed red;
    /**/

    * {
        scroll-margin-top: 2em;
    }

    @media (max-width: 350px) and (max-width: 300px) {
        * {
            scroll-margin-top: 0;
        }
    }

    img {
        max-width: 50%;
        max-height: 50%;
    }

    /*
    table {
        border-collapse: collapse;
    }
    */

    table,
    th,
    td {
        border: none;
    }

    table tr:nth-child(even) {
        background-color: rgba(255, 255, 255, 0.05);
    }

    table th {
        background-color: rgba(255, 255, 255, 0.1);
        text-align: center;
    }

    table th,
    table td {
        padding: 5px;
    }
`;
