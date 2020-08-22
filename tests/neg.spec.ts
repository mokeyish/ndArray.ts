import { array1d, ops } from '../src';

describe('NdArray neg', () => {
    it('neg 0', () => {
        const a = array1d([1, 2, 5]);
        expect(ops.neg(a).data).toEqual([-1, -2, -5]);
    })

    it('neg 1', () => {
        const a = array1d([1, 2, 5]);
        expect(a.neg().data).toEqual([-1, -2, -5]);
    })

    it('neg 2', () => {
        const a = [1, 2, 5];
        expect(ops.neg(a)).toEqual([-1, -2, -5]);
    })
    it('neg 3', () => {
        const a = 7
        expect(ops.neg(a)).toEqual(-7);
    })
})
