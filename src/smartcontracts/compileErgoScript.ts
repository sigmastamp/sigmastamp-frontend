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

    // TODO: !!! Not working compilation
    const compilerResponse = await fetch(
        // TODO: !!! http://assembler.sigmastamp.ml:14747 into config
        // TODO: !!! Running on native port
        // TODO: !!! HTTPs
        `http://assembler.sigmastamp.ml:14747/compile`,
        {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );

    const compilerResponseBody = await compilerResponse.json();

    if (compilerResponseBody.success === false) {
        throw new Error(
            `Failed to compile Ergo script:\n${compilerResponseBody.detail}`,
        );
    }

    return compilerResponseBody;
}
