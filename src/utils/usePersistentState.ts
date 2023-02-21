import { Dispatch, SetStateAction, useEffect, useState } from 'react';

/**
 * A custom hook that provides persistent state that is saved in `localStorage`.
 *
 * @template T The type of the state value.
 * @param {string} key The key used to store the state in `localStorage`.
 * @param {T} initialValue The initial value of the state.
 * @returns {[T, Dispatch<SetStateAction<T>>]} A tuple containing the current state and a function to update it.
 * @generator https://sharegpt.com/c/CiDAHqq
 */
export function usePersistentState<T>(
    key: string,
    initialValue: T,
): [T, Dispatch<SetStateAction<T>>] {
    const [state, setState] = useState<T>(() => {
        const valueInLocalStorage = window.localStorage.getItem(key);
        if (valueInLocalStorage) {
            return JSON.parse(valueInLocalStorage);
        }
        return initialValue;
    });

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
}
