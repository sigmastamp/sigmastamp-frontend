// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import express from 'express';
import path from 'path';
import serveStatic from 'serve-static';

express()
    .use(
        serveStatic(path.join(__dirname, '../public'), {
            index: false,
            cacheControl: false,
            setHeaders: (response) => {
                //response.setHeader('Cache-Control', 'no-cache');
                //response.setHeader('Access-Control-Allow-Origin', '*');
                //response.setHeader('Content-disposition', 'inline');
                response.type('text/html').send(`{

                    val sigmaStampNftIssuanceOK = {
                        
                        val assetType = OUTPUTS(0).R7[Coll[Byte]].get
                        val stampedDocHash = OUTPUTS(0).R8[Coll[Byte]].get
                        val issued = OUTPUTS(0).tokens.getOrElse(0, (INPUTS(0).id, 0L))
                
                        INPUTS(0).id == issued._1 && issued._2 == 1 &&
                        OUTPUTS(0).value == $ergsSendTogetherWithNFTL &&
                        OUTPUTS(0).propositionBytes == PK("$userAddress").propBytes &&
                        OUTPUTS(1).value == $ergsFeeForSigmaStampServiceL &&
                        OUTPUTS(1).propositionBytes == PK("$sigmaStampProviderAddress").propBytes &&
                        assetType == fromBase64("$assetTypeValue") &&
                        stampedDocHash == fromBase64("$documentHashInBase64") &&
                        OUTPUTS.size == 3
                
                    }
                
                    val returnFunds = {
                
                        val total_without_fee = INPUTS.fold(0L, {(x:Long, b:Box) => x + b.value}) - $returnTransactionFeeL
                
                        OUTPUTS(0).value >= total_without_fee &&
                        OUTPUTS(0).propositionBytes == PK("$userAddress").propBytes &&
                        (PK("$sigmaStampAssemblerNodeAddr") || HEIGHT > $refundHeightThreshold) &&
                        OUTPUTS.size == 2
                
                    }
                
                    sigmaProp(sigmaStampNftIssuanceOK || returnFunds)
                
                }`);
            },
        }),
    )
    .listen(10340);
