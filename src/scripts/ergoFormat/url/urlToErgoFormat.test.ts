import { urlToErgoFormat } from './urlToErgoFormat';

describe('how conversion of url to ergo fromat works', () => {
    it('can convert simple url to ergo fromat for R9', () => {
        expect(urlToErgoFormat('https://www.sigmastamp.ml/verify/foo')).toBe(
            '0e2468747470733a2f2f7777772e7369676d617374616d702e6d6c2f7665726966792f666f6f',
        );
        expect(urlToErgoFormat('https://www.sigmastamp.ml/verify/bar')).toBe(
            '0e2468747470733a2f2f7777772e7369676d617374616d702e6d6c2f7665726966792f626172',
        );
        expect(
            urlToErgoFormat(
                'https://sigmastamp.ml/verify?hash=a16d5705c031866f5c5dd1ba39e43538193b45718af5a50a115e1c8d67c209cd',
            ),
        ).toBe(
            '0e6268747470733a2f2f7369676d617374616d702e6d6c2f7665726966793f686173683d61313664353730356330333138363666356335646431626133396534333533383139336234353731386166356135306131313565316338643637633230396364',
        );
        expect(urlToErgoFormat('https://collboard.com/')).toBe(
            '0e1668747470733a2f2f636f6c6c626f6172642e636f6d2f',
        );
    });
});
