import { array1d, ops } from '../src';

describe('NdArray mul', () => {
    it('mul 0', () => {
        const a = array1d([1, 2, 5]);
        expect(a.mul(2).data).toEqual([2, 4, 10]);
    })
    it('mul 1', () => {
        const a = array1d([1, 2, 5]);
        expect(ops.mul(a, 2).data).toEqual([2, 4, 10]);
    })
    it('mul 2', () => {
        const a = array1d([1, 2, 5]);
        const b = array1d([2, 3, 4]);
        expect(a.mul(b).data).toEqual([2, 6, 20]);
    })
    it('mul 3', () => {
        const a = array1d([1, 2, 5]);
        const b = array1d([2, 3, 4]);
        expect(ops.mul(a, b).data).toEqual([2, 6, 20]);
    })

    it('mul 4', () => {
        const a = array1d([1, 2, 5]);
        const b = array1d([2, 3, 4]);
        a.mulAssign(b);
        expect(a.data).toEqual([2, 6, 20]);
    })
})
