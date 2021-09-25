import express from 'express';
import { Server } from 'http';
import path from 'path';
import serveStatic from 'serve-static';
import { randomPort } from '../utils/randomPort';
import { compileErgoScript } from './compileErgoScript';
import { createScript } from './createScript';

describe('how compiling of ergo script works', () => {
    // TODO: DRY beforeEach+afterEach
    const PORT = randomPort();
    let server: Server;

    beforeEach(() => {
        server = express()
            .use(
                serveStatic(path.join(__dirname, '../../public'), {
                    index: false,
                    cacheControl: false,
                    setHeaders: (response) => {
                        response.setHeader('Cache-Control', 'no-cache');
                        response.setHeader('Access-Control-Allow-Origin', '*');
                        response.setHeader('Content-disposition', 'inline');
                    },
                }),
            )
            .listen(PORT);
        // console.info(`http://localhost:${PORT}`);
    });

    afterEach(() => {
        server.close();
    });

    it('can will fail compiling broken script', () => {
        return expect(
            compileErgoScript({ script: `broken script -/*-/*+-*/*-/` }),
        ).rejects.toThrowError();
    });

    it('can compile ergo script', () => {
        return expect(
            createScript({
                script: `http://localhost:${PORT}/scripts/sigmastamp-nft.scala`,
                ergsSendTogetherWithNFT: 100000000,
                userAddress:
                    '3Ww7y6vi4NhFZ1ufsEF8vQNyGrvhNmeMmDWP9h3s4qSEFSMoGooV',
                ergsFeeForSigmaStampService: 100000000,
                sigmaStampProviderAddress:
                    '3Ww7y6vi4NhFZ1ufsEF8vQNyGrvhNmeMmDWP9h3s4qSEFSMoGooV',
                assetTypeValue: 'Ad4=',
                documentHashInBase64:
                    'oW1XBcAxhm9cXdG6OeQ1OBk7RXGK9aUKEV4cjWfCCc0',
                returnTransactionFee: 10000000,
                sigmaStampAssemblerNodeAddr:
                    '3Ww7y6vi4NhFZ1ufsEF8vQNyGrvhNmeMmDWP9h3s4qSEFSMoGooV',
                refundHeightThreshold: 10,
            }).then((compiled) => compileErgoScript(compiled)),
        ).resolves.toEqual({
            address:
                'sjNF7r85JtcoCFBYpLnHSFqBbMgryMbeww6WLELvktfw6uHEhAZWMc9p44JxiCRL5KSQ4fkkMFiZfnVDj39dCFFCixQTyfsRuf4tHunB25EXmRc9scJEomPFiPgPDmDgiJXaBdk6N5gMQuzjEKqcZT6t25GxgX9H3rzasqoK9uJXxRFUdba7aX4oMAYa4f3fTZRZZd8vBR4QBp9H1EpCc8Mra8Urag7hhsLHtcr6fXgStockJXFZkf2Wsf5tE4qqxCPGroKbRia14VHy2JRu5DXkqP8YigJoDS5eFSq6NeYHqU9h3CwcnyQW22UjXuhX89RG3cygyQJZKBtouVcu4Cizg1Exj4ywG4uutg9aBroZRBtnEHmCa8A7ZrxGeV8VcuxGQnyjyinyDqstkEt7FNrR8jvnFrz9s62m8jGZko5ML18sTDeV6YauFgeCB58NpvWTidTLTUUN5zJzuKrsTkTNGB7epbjyKS5Jn2NaUFhoCQSjq1rw2LgXsHy9c2LcrACy5zv5haVVW5u7cQAT',
        });
    });

    it('can compile mocked ergo script', () => {
        return expect(
            createScript({
                script: `http://localhost:${PORT}/scripts/sigmastamp-nft.mocked.scala`,
            }).then((compiled) => compileErgoScript(compiled)),
        ).resolves.toEqual({
            address:
                '4ruzmKDpE1xpztdbZRxJsYUTfkeJwZjuxVTmJTstxGj4qo3kfSHCUZx9tgVcGtqQPC4P6oC46LPxTCBmZAYV4kdsgkBYa58ZawR29PdxPDjgio5cAANo5wQuDwh6q5LAzHJMwTwBCg3eh6YuoPp9ZxECxBjsSmS3XqdfAXQPR8HrPdc2txXbA2whma18Lw8vkkE7QizVwiyC1Lj5Xe3yLE3V3oE1wqdeafPA9YqDi14R7Hekn8LXHZgqgrb6Z6fxb4dFJzoT4x6UfGPstGjvtqcJkUYgJzxVYyshVUWApzEwfbcDkaS9QSH3bcTE3f7y2zussGG3u19HHMv39j9HH8hmPNmPmpMwwZMjWZWFUBNVnh1MHBTAXUD7gfeBpWJ1BsqnKrHARQk2pimiXFCgmAd8sHyUUxonf3MAqYi32bCvz8wrkVGNbw6PkC6EXShfwFe6Wc7Q4cdAnK7iCmx3ehCR2pj6gGbEZETkZNKrhv63fhaxprQ7iGcNHYN6nzAdwLh1VGfHnxVWVSBqnkHtJC',
        });
    });
});
