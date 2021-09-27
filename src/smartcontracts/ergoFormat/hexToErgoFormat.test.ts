import { hexToErgoFormat } from './hexToErgoFormat';
import { urlToErgoFormat } from './urlToErgoFormat';

describe('how conversion from hex to ergo fromat works', () => {
    it('can convert hex to ergo fromat', () => {
        expect(hexToErgoFormat('TODO:!!!')).toBe('');
    });
});
