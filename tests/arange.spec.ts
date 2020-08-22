import { NdArray } from '../src';

describe('NdArray arange', () => {

    it('start', () => {
        const a = NdArray.range(5);
        expect(a.ndArray()).toEqual([0, 1, 2, 3, 4]);
    })

    it('start end', () => {
        const a = NdArray.range(2, 6);
        expect(a.ndArray()).toEqual([2, 3, 4, 5]);
    })

    it('start end step', () => {
        const a = NdArray.range(2, 6, 2);
        expect(a.ndArray()).toEqual([2, 4]);
    })

})
