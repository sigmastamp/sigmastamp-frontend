import { string_data_url } from '../interfaces/stringTypes';

export async function readFileAsDataUrl(
    file: File | Blob,
): Promise<string_data_url> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.addEventListener('loadend', (event) =>
            resolve(event.target!.result as string_data_url),
        );
        reader.addEventListener('error', reject);

        reader.readAsDataURL(file);
    });
}
