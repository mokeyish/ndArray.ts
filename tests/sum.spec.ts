
import { array1d, ops } from '../dist';

describe('NdArray sum', () => {
    it('sum0', () => {
        const a = [1, 2, 5];
        expect(ops.sum(a)).toEqual(8);
    })
    it('sum1', () => {
        const a = array1d([1, 2, 5]);
        expect(ops.sum(a)).toEqual(8);
    })
    it('sum2', () => {
        const a = array1d([1, 2, 5]);
        expect(a.sum()).toEqual(8);
    })
})
