import RssParser from 'rss-parser';
import { IOracle } from './_IOracle';

export class NytimesOracle implements IOracle {
    public name = 'NYTIMES';
    public ttl = -1;

    public async getData() {
        const rssParser = new RssParser();
        const feed = await rssParser.parseURL(
            `https://rss.nytimes.com/services/xml/rss/nyt/World.xml`,
        );

        // console.log({ feed });

        const firstItem = feed.items[0] as {
            content: 'Chancellor Olaf Scholz and his new cabinet were sworn in, beginning a new chapter for Europe’s largest democracy. Angela Merkel wished him well and called the chancellorship “one of the most beautiful duties there are.”';
            contentSnippet: 'Chancellor Olaf Scholz and his new cabinet were sworn in, beginning a new chapter for Europe’s largest democracy. Angela Merkel wished him well and called the chancellorship “one of the most beautiful duties there are.”';
            creator: 'The New York Times';
            'dc:creator': 'The New York Times';
            guid: 'https://www.nytimes.com/live/2021/12/08/world/germany-scholz-merkel';
            isoDate: '2021-12-08T18:38:54.000Z';
            link: 'https://www.nytimes.com/live/2021/12/08/world/germany-scholz-merkel';
            pubDate: 'Wed, 08 Dec 2021 18:38:54 +0000';
            title: 'Germany’s Merkel Hands Over Chancellor’s Office to Scholz';
        };

        return [
            {
                title: 'The\nNew York Times',
                format: 'Front page title',
                value: firstItem.title,
                source: new URL(firstItem.link),
                /*
                TODO: @hejny Maybe implement this:
                getShortenValue(length: number) {
                    return firstTitle.substr(0, length);
                },
                */
            },
        ];
    }
}

/**
 * TODO: @hejny Add more news sources
 * @see https://medium.com/rakuten-rapidapi/top-10-best-news-apis-google-news-bloomberg-bing-news-and-more-bbf3e6e46af6
 */
