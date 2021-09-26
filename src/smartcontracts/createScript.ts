import { ergo_scala_script, string_href } from '../interfaces/stringTypes';

export async function createScript<T extends { script: string_href }>(
    options: T,
): Promise<{ script: ergo_scala_script }> {
    const response = await fetch(options.script);
    let script = await response.text();

    // console.log({ script });

    for (const [key, value] of Object.entries(options).filter(
        // tslint:disable-next-line:no-shadowed-variable
        ([key]) => key !== 'script',
    )) {
        const scriptArray = script.split(`$${key}`);
        if (scriptArray.length === 1) {
            throw new Error(
                `Could not find param "${key}" in the script "${options.script}"`,
            );
        }
        script = scriptArray.join(value);
    }

    // TODO: Probbably extract function replaceParams

    const match = script.match(/\$[a-zA-Z0-9]+/g);
    if (match) {
        throw new Error(
            `Missing params ${match
                .map((param) => `"${param.substring(1)}"`)
                .join(', ')} for the script "${options.script}".`,
        );
    }

    return { script };
}
