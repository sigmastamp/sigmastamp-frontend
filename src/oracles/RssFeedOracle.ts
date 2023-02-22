import RssParser from 'rss-parser';
import { IOracle } from './_IOracle';

export class RssFeedOracle implements IOracle {
    constructor(
        private readonly title: string,
        private readonly format: string,
        private readonly url: string,
    ) {}

    public name = 'NYTIMES';
    public ttl = -1;

    public async getData() {
        const rssParser = new RssParser();

        const response = await fetch(this.url /*  { mode: 'no-cors' }*/);
        const feedText = await response.text();
        const feed = await rssParser.parseString(feedText);

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
                title: this.title,
                format: this.format,
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
