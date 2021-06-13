import * as React from 'react';
import { Loader } from './Loader';

export type IAwaitable<T> = T | Promise<T>;

export type IFactory<T> = () => T;

export type IFactorable<T> = T | IFactory<T>;


export function factor<T>(factorable: IFactorable<T>): T {
    if (typeof factorable === 'function') {
        return (factorable as any)();
    } else {
        return factorable;
    }
}

interface IAsyncContentComponentProps {
    /**
     * Component to be rendered before the content is loaded
     *
     * If not set, default loading is used
     */
    loading?: JSX.Element;

    /**
     * The async content to be rendered
     */
    content: IFactorable<IAwaitable<JSX.Element>>;
}

interface IAsyncContentComponentState {
    content: JSX.Element;
}

/**
 * Utility for mounting RxJS observable content
 *
 * @collboard-modules-sdk
 */
export function AsyncContentComponent({ loading, content }: IAsyncContentComponentProps) {
    const [state, setState] = React.useState<IAsyncContentComponentState>({ content: loading || <Loader /> });

    React.useEffect(() => {
        (async () => {
            setState({ content: await factor(content) });
        })();

        return () => {
            /* TODO: Can here be some reasonable teardown logic? */
        };
    }, [content]);

    return <>{state.content}</>;
}