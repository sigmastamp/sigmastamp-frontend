import express from 'express';
import { Server } from 'http';
import path from 'path';
import serveStatic from 'serve-static';
import { randomPort } from '../utils/randomPort';
import { spaceTrim } from '../utils/spaceTrim';
import { createScript } from './createScript';

// tslint:disable:no-trailing-whitespace
describe('how creating script works', () => {
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

    it('will fail with non-existing script', () => {
        return expect(
            createScript({
                script: `http://localhost:${PORT}/scripts/not-existing-script.scala`,
            }),
        ).rejects.toThrowError();
    });

    it('will fail when there is missing param', () => {
        return expect(
            createScript({
                script: `http://localhost:${PORT}/scripts/sigmastamp-nft.scala`,
            }),
        ).rejects.toThrowError();
    });

    it('will fail when there is extra param', () => {
        return expect(
            createScript({
                script: `http://localhost:${PORT}/scripts/sigmastamp-nft.scala`,
                someExtraParam: 'foo',
            }),
        ).rejects.toThrowError();
    });

    it('can create sigma_stamp_nft.scale', () => {
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
            }).then(({ script }) => spaceTrim(script)),
        ).resolves.toEqual(
            spaceTrim(`
                        {

                            val sigmaStampNftIssuanceOK = {
                                
                                val assetType = OUTPUTS(0).R7[Coll[Byte]].get
                                val stampedDocHash = OUTPUTS(0).R8[Coll[Byte]].get
                                val issued = OUTPUTS(0).tokens.getOrElse(0, (INPUTS(0).id, 0L))

                                INPUTS(0).id == issued._1 && issued._2 == 1 &&

                                OUTPUTS(0).value == 100000000L &&
                                OUTPUTS(0).propositionBytes == PK("3Ww7y6vi4NhFZ1ufsEF8vQNyGrvhNmeMmDWP9h3s4qSEFSMoGooV").propBytes &&

                                OUTPUTS(1).value == 100000000L &&
                                OUTPUTS(1).propositionBytes == PK("3Ww7y6vi4NhFZ1ufsEF8vQNyGrvhNmeMmDWP9h3s4qSEFSMoGooV").propBytes &&

                                assetType == fromBase64(Ad4=) &&
                                stampedDocHash == fromBase64(bfcd486994cb8bc0a3e618924137ef4a848ebc5aa98e0c1d5661325e0849e432) &&
                                
                                OUTPUTS.size == 3

                            }

                            val returnFunds = {

                                val total_without_fee = INPUTS.fold(0L, {(x:Long, b:Box) => x + b.value}) - 10000000L

                                OUTPUTS(0).value >= total_without_fee &&
                                OUTPUTS(0).propositionBytes == PK("3Ww7y6vi4NhFZ1ufsEF8vQNyGrvhNmeMmDWP9h3s4qSEFSMoGooV").propBytes &&

                                (PK("3Ww7y6vi4NhFZ1ufsEF8vQNyGrvhNmeMmDWP9h3s4qSEFSMoGooV") || HEIGHT > 10) &&
                                
                                OUTPUTS.size == 2

                            }

                            sigmaProp(sigmaStampNftIssuanceOK || returnFunds)

                        }
            `),
        );
    });
});
