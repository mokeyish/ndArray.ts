
import { NdArray, ops } from '../src';

describe('NdArray div', () => {
    it('div 1', () => {
        const a = NdArray.fromArray([1, 2, 3]);
        expect(ops.div(a, 2).data).toEqual([0.5, 1, 1.5]);
    })
    it('div 2', () => {
        const a = NdArray.fromArray([1, 2, 3]);
        const b = NdArray.fromArray([1, 2, 3]);
        expect(ops.div(a, b).data).toEqual([1, 1, 1]);
    })

    it('div 3', () => {
        const a = NdArray.fromArray([1, 2, 3]);
        const b = NdArray.fromArray([1, 2, 3]);
        expect(a.div(b).data).toEqual([1, 1, 1]);
    })
    it('div 4', () => {
        const a = NdArray.fromArray([1, 2, 3]);
        expect(a.div(2).data).toEqual([0.5, 1, 1.5]);
    })


    it('div assign 1', () => {
        const a = NdArray.fromArray([1, 2, 3]);
        ops.divAssign(a, 2);
        expect(a.data).toEqual([0.5, 1, 1.5]);
    })
    it('div assign 2', () => {
        const a = NdArray.fromArray([1, 2, 3]);
        const b = NdArray.fromArray([1, 2, 3]);
        a.divAssign(b);
        expect(a.data).toEqual([1, 1, 1]);
    })

    it('div assign 3', () => {
        const a = NdArray.fromArray([1, 2, 3]);
        const b = NdArray.fromArray([1, 2, 3]);
        a.divAssign(b);
        expect(a.data).toEqual([1, 1, 1]);
    })
    it('div assign 4', () => {
        const a = NdArray.fromArray([1, 2, 3]);
        a.divAssign(2);
        expect(a.data).toEqual([0.5, 1, 1.5]);
    })

})
