import * as React from 'react';
import { Observable } from 'rxjs';
import { Promisable } from 'type-fest';
import { Loader } from './Loader';
/**
 * TODO: Make from this some microlibrary
 */

interface IObservableContentComponentProps {
    /**
     * Component to be rendered before the content is loaded
     *
     * If not set, default <Loader/> is used
     */
    loader?: JSX.Element;

    /**
     * You can put here any RxJS observable. For example BehaviorSubject.
     */
    content: Observable<Promisable<JSX.Element>>;
}

interface IObservableContentComponentState {
    content: JSX.Element;
}

/**
 * Utility for mounting RxJS observable content
 *
 * @collboard-modules-sdk
 */
export function ObservableContentComponent({
    loader,
    content,
}: IObservableContentComponentProps) {
    const [state, setState] = React.useState<IObservableContentComponentState>({
        content: loader || <Loader />,
    });

    React.useEffect(() => {
        const subscription = content.subscribe(async (newContentAwaitable) => {
            const newContent = await newContentAwaitable;
            setState({ content: newContent });
        });

        return () => subscription.unsubscribe();
    }, [content]);

    return <>{state.content}</>;
}
