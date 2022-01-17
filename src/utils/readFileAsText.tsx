import { string_data_url } from '../interfaces/stringTypes';

export async function readFileAsText(
    file: File | Blob,
): Promise<string_data_url> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.addEventListener('loadend', (event) =>
            resolve(event.target!.result as string),
        );
        reader.addEventListener('error', reject);

        reader.readAsText(file);
    });
}
