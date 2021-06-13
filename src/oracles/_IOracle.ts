import { IAwaitable } from '../components/AsyncContentComponent';

export interface IOracle<TData> {
    /**
     * Unique identifier of the Oracle
     * @example "BTC"
     */
    name: string;

    /**
     * Title for web and certificate
     * @example "Bitcoin"
     */
    title: string;

    /**
     * Time to live in seconds
     * When -1 provided, data will be valid until page is reloaded
     *
     * TODO: Enable to provide observable instead of data+ttl
     */
    ttl: number;

    /**
     * Title for web and certificate of each data key
     * Theese will be prepended to main title
     */
    dataTitles: Record<keyof TData, string>;

    /**
     * Gets current state of oracles domain
     */
    getData(): IAwaitable<TData>;
}

// @see https://medium.com/rakuten-rapidapi/top-10-best-news-apis-google-news-bloomberg-bing-news-and-more-bbf3e6e46af6
