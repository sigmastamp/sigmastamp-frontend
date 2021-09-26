import { sendFollowRequest } from './sendFollowRequest';

describe('how sending follow request works', () => {
    it('can send follow request', () => {
        return expect(
            sendFollowRequest({
                compiledSmartContractAddress:
                    'dX6e59YgDxr2uNwBR1L3S8juLR66vgvZcgM8YuM2h9S2Ci9o1yEpt8uyGnTmDSYnraqA7z1FWk8qpEzixXniXAwRpsMwqxcbZDVtkhNXSdWmq81AiQEgE6TmzELoM4TGFCPzGB8UBaHoyexxhTW7QVxxmYrPUKW8vWd9tPq7eQrs1Keg6QX2daSvCxsdVyn8BVTEwin8oQBSoH8Vz6meM7quwQtc3b6FER1YHCKV1hZKrjrQ31t1rkrKcCwakavFLMgBnQizQeaoekqromCiyAe7Q39RJX2ozuAf9cbcBXXSNbNv8fdRKGcCKbBykLwpy7NJ834vASdBXWiu2yUCTNgh1YKmYdjGi3oZppo7mMkNy2aPsCVZv9Jg1bsyMmD7jvpq6kRHupxaYprLpijE6wMCQRtFVRiq',
                userAddress:
                    '3Ww7y6vi4NhFZ1ufsEF8vQNyGrvhNmeMmDWP9h3s4qSEFSMoGooV',
                sigmaStampProviderAddress:
                    '3Ww7y6vi4NhFZ1ufsEF8vQNyGrvhNmeMmDWP9h3s4qSEFSMoGooV',
                documentHashInHex:
                    '4d1a7eb6b84817769808c9a8a15ac240470d21b3b6f20e93795c2e2c6bae92be',
                ergsSendTogetherWithNFT: 100000000,
                ergsFeeForSigmaStampService: 100000000,
                mintingFee: 20000000,
            }),
        ).resolves.toHaveProperty('amount');
    });
});
