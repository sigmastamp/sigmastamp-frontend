import RssParser from 'rss-parser';
import { IOracle } from './_IOracle';

export class NytimesOracle implements IOracle {
    public name = 'NYTIMES';
    public title = 'The New York Times';
    public ttl = -1;

    public dataTitles = { firstTitle: 'first title' };

    public async getData() {
        const rssParser = new RssParser();
        const feed = await rssParser.parseURL(
            `https://rss.nytimes.com/services/xml/rss/nyt/World.xml`,
        );

        // console.log({ feed });

        const firstTitle = feed.items[0].title as string;

        return [
            {
                title: 'first title',
                value: firstTitle,
                // !!! URL From the feed source:

                getCompactValue(length: number) {
                    return firstTitle.substr(0, length /* TODO: !!! Better */);
                },
            },
        ];
    }
}

/**
 * TODO: More news sources
 * @see https://medium.com/rakuten-rapidapi/top-10-best-news-apis-google-news-bloomberg-bing-news-and-more-bbf3e6e46af6
 */
