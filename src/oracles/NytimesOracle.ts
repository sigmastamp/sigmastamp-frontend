import RssParser from 'rss-parser';
import { IOracle } from './_IOracle';

export class NytimesOracle implements IOracle<{ firstTitle: string }> {
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

        return {
            firstTitle: feed.items[0].title as string,
        };
    }
}
