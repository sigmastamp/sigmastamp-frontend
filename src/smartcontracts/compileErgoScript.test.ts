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
                    'bfcd486994cb8bc0a3e618924137ef4a848ebc5aa98e0c1d5661325e0849e432',
                returnTransactionFee: 10000000,
                sigmaStampAssemblerNodeAddr:
                    '3Ww7y6vi4NhFZ1ufsEF8vQNyGrvhNmeMmDWP9h3s4qSEFSMoGooV',
                refundHeightThreshold: 10,
            }).then((compiled) => compileErgoScript(compiled)),
        ).resolves.toEqual('');
    });
});
