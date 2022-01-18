import { forImmediate } from 'waitasecond';

export async function promptAsync(
    message?: string,
    _default?: string,
): Promise<string | null> {
    await forImmediate();
    const result = prompt(message, _default);

    return result;
}

/**
 * TODO: @hejny Nicer user input than prompt
 */
