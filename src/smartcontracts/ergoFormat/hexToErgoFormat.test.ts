import { hexToErgoFormat } from './hexToErgoFormat';

describe('how conversion from hex to ergo fromat works', () => {
    it('can convert hex to ergo fromat for R8', () => {
        expect(
            hexToErgoFormat(
                '4d1a7eb6b84817769808c9a8a15ac240470d21b3b6f20e93795c2e2c6bae92be',
            ),
        ).toBe(
            '0e204d1a7eb6b84817769808c9a8a15ac240470d21b3b6f20e93795c2e2c6bae92be',
        );
    });
});
