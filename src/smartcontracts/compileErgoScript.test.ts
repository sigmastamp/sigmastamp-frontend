import express from 'express';
import fs from 'fs';
import { Server } from 'http';
import path from 'path';
import serveStatic from 'serve-static';
import { randomPort } from '../utils/randomPort';
import { isProxyContractAddressValid } from './addressValidator';
import { compileErgoScript } from './compileErgoScript';
import { createScript } from './createScript';

//fix proposed by (https://github.com/facebook/jest/issues/11607)
jest.useRealTimers();

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
        jest.setTimeout(10000);
        return expect(
            compileErgoScript({ script: `broken script -/*-/*+-*/*-/` }),
        ).rejects.toThrowError();
    });

    it('can compile ergo script', () => {
        jest.setTimeout(10000);
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
            })
                .then((compiled) => compileErgoScript(compiled))
                .then(({ address }) => isProxyContractAddressValid(address)),
        ).resolves.toBe(true);
    });

    it('can compile mocked ergo script', () => {
        jest.setTimeout(10000);
        return expect(
            createScript({
                script: `http://localhost:${PORT}/scripts/sigmastamp-nft.mocked.scala`,
            })
                .then((compiled) => compileErgoScript(compiled))
                .then(({ address }) => isProxyContractAddressValid(address)),
        ).resolves.toBe(true);
    });

    it('can compile mocked hardcoded ergo script', () => {
        jest.setTimeout(10000);
        return expect(
            compileErgoScript({
                script: fs.readFileSync(
                    path.join(
                        __dirname,
                        '../../public/scripts/sigmastamp-nft.mocked.scala',
                    ),
                    'utf8',
                ),
            }).then(({ address }) => isProxyContractAddressValid(address)),
        ).resolves.toBe(true);
    });
});

/*
TODO: There is an error in output which is not fatal but maybe worth investigating:

 console.error
      Error: Cross origin http://localhost forbidden
          at dispatchError (/home/runner/work/sigmastamp-frontend/sigmastamp-frontend/node_modules/jsdom/lib/jsdom/living/xhr/xhr-utils.js:63:19)
          at Object.validCORSHeaders (/home/runner/work/sigmastamp-frontend/sigmastamp-frontend/node_modules/jsdom/lib/jsdom/living/xhr/xhr-utils.js:75:5)
          at receiveResponse (/home/runner/work/sigmastamp-frontend/sigmastamp-frontend/node_modules/jsdom/lib/jsdom/living/xhr/XMLHttpRequest-impl.js:794:19)
          at Request.<anonymous> (/home/runner/work/sigmastamp-frontend/sigmastamp-frontend/node_modules/jsdom/lib/jsdom/living/xhr/XMLHttpRequest-impl.js:658:43)
          at Request.emit (events.js:400:28)
          at Request._processResponse (/home/runner/work/sigmastamp-frontend/sigmastamp-frontend/node_modules/jsdom/lib/jsdom/living/helpers/http-request.js:228:12)
          at ClientRequest.<anonymous> (/home/runner/work/sigmastamp-frontend/sigmastamp-frontend/node_modules/jsdom/lib/jsdom/living/helpers/http-request.js:101:12)
 */
