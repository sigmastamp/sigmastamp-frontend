import { string_url } from '../interfaces/stringTypes';

export async function fetchAsFile(url: string_url): Promise<File> {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], 'sample.jpg' /* TODO: !!! Real filename */);
}
