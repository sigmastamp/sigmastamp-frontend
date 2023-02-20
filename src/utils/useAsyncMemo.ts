import React from 'react';

/**
 * React hook for generating async memoized data.
 * This is a copy of @see https://github.com/awmleer/use-async-memo/blob/master/src/index.ts
 */
export function useAsyncMemo<TValue>(factory: () => Promise<TValue>, deps: React.DependencyList): TValue | null {
    const [value, setValue] = React.useState/* <- TODO: Import and use just a useState */ <TValue | null>(null);
    React.useEffect(
        /* <- TODO: Import and use just a useEffect */ () => {
            let cancel = false;
            const promise = factory();
            if (promise === undefined || promise === null) return;
            promise.then((val2) => {
                if (!cancel) {
                    setValue(val2);
                }
            });
            return () => {
                cancel = true;
            };
        },
        // Note: Passing correct deps is up to useAsyncMemo caller.
        // eslint-disable-next-line react-hooks/exhaustive-deps
        deps,
    );
    return value;
}

/**
 * TODO: Handle errors here
 * Note: Hook for modules must use same React as the main Collboard app
 *       So this is a copy of @see https://github.com/awmleer/use-async-memo/blob/master/src/index.ts
 * TODO: [🧵] Move to external LIB for react loadables
 */
