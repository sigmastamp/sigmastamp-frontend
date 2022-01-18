import { ObjectStorage, PrefixStorage } from 'everstorage';
import { string_date } from '../interfaces/stringTypes';

const cache = new ObjectStorage<{ validTo: string_date; data: any }>(
    new PrefixStorage(localStorage, 'cache'),
);

/**
 *
 * @param url
 * @param ttl Time to live in seconds. When -1 provided, data will be valid until page is reloaded.
 * @returns
 */
export async function fetchWithCache<T>(
    url: URL,
    ttl: number = -1,
): Promise<T> {
    // TODO: @hejny Storage with validity to everstorage
    const cacheItem = await cache.getItem(url.href);

    if (cacheItem) {
        if (cacheItem.validTo && new Date(cacheItem.validTo) > new Date()) {
            return cacheItem.data as T;
        }
    }

    const response = await fetch(
        url.href,
        /*{ mode: 'no-cors' }*/
    );
    // console.log({ response });
    const data = await response.json();

    if (data.error) {
        throw new Error(data.error);
    }

    if (ttl !== -1) {
        await cache.setItem(url.href, {
            validTo: new Date(Date.now() + ttl * 1000).toISOString(),
            data,
        });
    }

    return data;
}
