import { ERGO_ASSEMBLER_URL } from '../config';
import {
    ergo_scala_script,
    ergo_script_address,
} from '../interfaces/stringTypes';

/**
 * Copiles source in scala to Ergo3 adress format
 * @param source in scala
 */
export async function compileErgoScript({
    script,
}: {
    script: ergo_scala_script;
}): Promise<{ address: ergo_script_address }> {
    const body = JSON.stringify(script.trim())
        // TODO: !!! Is this required
        .split('^\n')
        .join('\n')
        .split('\n\n')
        .join('\n');

    const url = `${ERGO_ASSEMBLER_URL.href}compile`;
    const compilerResponse = await fetch(url, {
        method: 'POST',
        body,
        headers: {
            'Content-Type': 'application/json',
        },
    }).catch(() => {
        throw new Error(`Failed to fetch compile service on "${url}".`);
    });

    const compilerResponseBody = await compilerResponse.json();

    if (compilerResponseBody.success === false) {
        throw new Error(
            `Failed to compile Ergo script:\n${compilerResponseBody.detail}`,
        );
    }

    return compilerResponseBody;
}
