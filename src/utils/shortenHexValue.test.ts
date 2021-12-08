import { shortenHexValue } from './shortenHexValue';

describe('how shortening of hashes works', () => {
    it('will short full hash', () => {
        return expect(
            shortenHexValue(
                '301b6463199ab8241bc4660a557407287b2257fdca82e8bfc783054faefbbfe8',
                10,
            ),
        ).toBe('301b646…e8');
    });

    it('will short hash with some difficulty', () => {
        return expect(
            shortenHexValue(
                '000000000000000000059d1fe00282a7272ac4d421614be9bae31e35ac5ae3ce',
                10,
            ),
        ).toBe('0…59d1f…ce');
    });
});
