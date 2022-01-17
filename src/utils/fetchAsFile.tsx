import { lookup } from 'mime-types';
import { string_url } from '../interfaces/stringTypes';

export async function fetchAsFile(url: string_url): Promise<File> {
    const response = await fetch(url);
    const blob = await response.blob();
    let type = lookup(url);

    if (type === false) {
        type = 'application/octet-stream';
    }
    return new File([blob], basename(url), { type });
}

function basename(path: string_url): string {
    return path.split('/').reverse()[0];
}
