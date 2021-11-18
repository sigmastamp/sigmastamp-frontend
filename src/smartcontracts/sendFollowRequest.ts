import { BehaviorSubject } from 'rxjs';
import { forTimeSynced } from 'waitasecond';
import { ERGO_ASSEMBLER_URL } from '../config';
import { IPaymentStatus } from '../interfaces/IPaymentStatus';
import {
    ergo_script_address,
    ergo_wallet_address,
    nanoerg,
    string_hex,
} from '../interfaces/stringTypes';
import { hexToErgoFormat } from './ergoFormat/hex/hexToErgoFormat';
import { urlToErgoFormat } from './ergoFormat/url/urlToErgoFormat';

/**
 * TODO: !!! Probbably rename to something like followPaymentRequest
 */
export async function sendFollowRequest({
    compiledSmartContractAddress,
    userAddress,
    sigmaStampProviderAddress,
    documentHashInHex,
    ergsSendTogetherWithNFT,
    ergsFeeForSigmaStampService,
    mintingFee,
}: {
    compiledSmartContractAddress: ergo_script_address;
    userAddress: ergo_wallet_address;
    /**
     * TODO: !!! Is it ergo_script_address OR ergo_wallet_address
     */
    sigmaStampProviderAddress: ergo_script_address;
    documentHashInHex: string_hex;
    ergsSendTogetherWithNFT: nanoerg;
    ergsFeeForSigmaStampService: nanoerg;
    mintingFee: nanoerg;
}): Promise<{
    amount: nanoerg;

    /**
     * TODO: is it really in seconds?!
     * TODO: Make it absolute by Date
     */
    dueDate: Date;
    paymentStatus: IPaymentStatus;
}> {
    const amount: nanoerg =
        ergsSendTogetherWithNFT + ergsFeeForSigmaStampService + mintingFee;

    const requestBody = {
        address: compiledSmartContractAddress,
        returnTo: userAddress,
        startWhen: { erg: amount },
        txSpec: {
            requests: [
                {
                    ergValue: ergsSendTogetherWithNFT,
                    address: userAddress,
                    name: 'SigmaStampNFT',
                    amount: 1,
                    decimals: 0,
                    description:
                        'Proof of existence of document with Blake2b-256 hash specified in R8 register during minting of this NFT token.',
                    registers: {
                        R7: '0e0201de',
                        R8: hexToErgoFormat(documentHashInHex),
                        R9: urlToErgoFormat(
                            // TODO: decide about address format + move it into config ???
                            // @hejny @nitram147 - decide about URL path to use
                            `http://sigmastamp.ml/#/verify?hash=${documentHashInHex}`,
                        ),
                    },
                },
                {
                    value: ergsFeeForSigmaStampService,
                    address: sigmaStampProviderAddress,
                },
            ],
            fee: mintingFee,
            inputs: ['$userIns'],
            dataInputs: [],
        },
    };

    const followResponse = await fetch(`${ERGO_ASSEMBLER_URL.href}follow`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    });

    const followResponseBody = await followResponse.json();
    const { id: transactionId, dueTime } = followResponseBody;

    const dueDate = new Date(new Date().getTime() + dueTime * 1000);

    // TODO: Probbably split creation of paymentStatus into new function
    const paymentStatus = new BehaviorSubject({
        checkedDate:
            new Date(/* TODO: Taking user date can be dangerous, use some remote time. */),
        isPayed: false,
    }) as IPaymentStatus;

    (async () => {
        // TODO: Do this by a Destroyable Registration without [IIFE with side-effects]
        while (true) {
            await forTimeSynced(1000);

            if (
                new Date(/* TODO: Taking user date can be dangerous, use some remote time. */).getTime() >
                dueDate.getTime()
            ) {
                paymentStatus.error(
                    new Error(
                        'Timeout' /* TODO: TimeoutError class + better message */,
                    ),
                );
                paymentStatus.complete(/* TODO: Should be this there after error?! */);
                return;
            }

            // Loop
            const watchResponse = await fetch(
                `${ERGO_ASSEMBLER_URL.href}result/${transactionId}`,
            );
            const watchResponseBody = await watchResponse.json();
            const {
                /*id,*/ tx,
                detail /* pending, returning, mined, success, timeout, returnFailed */,
            } = followResponseBody;

            console.log({ watchResponse, watchResponseBody, tx });

            if (detail === 'success') {
                // TODO: !!! And now take tx and create big certificate

                paymentStatus.next({
                    checkedDate:
                        new Date(/* TODO: Taking user date can be dangerous, use some remote time. */),
                    isPayed: true,
                });
                paymentStatus.complete();
                return;
            }

            paymentStatus.next({
                checkedDate:
                    new Date(/* TODO: Taking user date can be dangerous, use some remote time. */),
                isPayed: false,
            });
        }
    })();

    return {
        amount,
        dueDate,
        paymentStatus,
    };
}

/*
TODO: Instructions from Martin how to fix a follow request


R9 nema vyzera tak ako vyzera
Ani R8

---

Majme Blake2b-256 bitovy hash v HEX formate napriklad:
4d1a7eb6b84817769808c9a8a15ac240470d21b3b6f20e93795c2e2c6bae92be

R8 bude obsahovat TYP_DAT---DLZKU_DAT_V_HEX---DATA_V_HEX (pricom miesto --- tam nie je nic, len to ide za sebou)
Typ dat je 0e
Dlzka dat je 20 [hexa] (kedze to je 20hex == 32 dec -> 32 * 8 (pretoze 1byte = 8bit) = 256 a nas hash je prave 256bitovy)
No a samotne data budu ten hash cize: 4d1a7eb6b84817769808c9a8a15ac240470d21b3b6f20e93795c2e2c6bae92be

Cize v R8 bude:
"R8": "0e204d1a7eb6b84817769808c9a8a15ac240470d21b3b6f20e93795c2e2c6bae92be"
Kedze je dlzka hashu stabilna a aj typ dat tak to mozes zobrat jednoducho tak ze pred hex prezentaciu hashu tj napr "4d1a7eb6b84817769808c9a8a15ac240470d21b3b6f20e93795c2e2c6bae92be" vlozis "0e20"
Cize to tam hardcodnes

----

R9 bude obsahovat rovnakym sposobom encodovane data v ktorych bude URL
Cize 0e na zaciatok ako typ
Potom XY kde XY je hexa hodnota urcuju kolko bytov dat bude nasledovat
A nasledne ascii znaky url prevedene na hexa
Na to som si vtedy pre seba napisal jednoduchy skript s nazvom "string_to_ergobytes.py"

```
#!/usr/bin/env python3

import sys
import base58
import hashlib

def print_usage(binary_name):
	print("python ./" + binary_name + " todo")
	print("\tWhere todo")

if len(sys.argv) != 2:
	print_usage(sys.argv[0])
	sys.exit(1)

input = sys.argv[1]


input_len = len(input)

result = "0e" + '{:02x}'.format(input_len) + input.encode("utf-8").hex()

print(result)

sys.exit(0)
```


tie includes na base58 a aj hashlib mozes vyhodit, tie mi tam ostali z ineho ergopython toolu, ktory som vyrabal...

a spustis to len ako

python ./string_to_ergobytes.py "https://www.sigmastamp.ml/verify/blabla..."

Tym si odskusat ako ma ta url vyzerat encodovana aby si mohol napisal JS ekvivalent toho

Potom by to uz vsetko malo ist :)

*/
