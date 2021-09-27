import { urlToErgoFormat } from './urlToErgoFormat';

describe('how conversion of url to ergo fromat works', () => {
    it('can convert simple url to ergo fromat for R9', () => {
        expect(urlToErgoFormat('TODO:!!!')).toBe('');
    });
});
