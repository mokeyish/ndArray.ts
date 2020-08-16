import { array1d, ops } from '../dist';

describe('NdArray neg', () => {
    it('neg 0', () => {
        const a = array1d([1, 2, 5]);
        expect(ops.neg(a).data).toEqual([-1, -2, -5]);
    })
    it('neg 1', () => {
        const a = array1d([1, 2, 5]);
        expect(a.neg().data).toEqual([-1, -2, -5]);
    })
})
