
import { NdArray, ops } from '../src';

describe('NdArray sub', () => {
    it('sub 1', () => {
        const a = NdArray.fromArray([1, 2, 3]);
        expect(ops.sub(a, 2).data).toEqual([-1, 0, 1]);
    })
    it('sub 2', () => {
        const a = NdArray.fromArray([1, 2, 3]);
        const b = NdArray.fromArray([1, 2, 3]);
        expect(ops.sub(a, b).data).toEqual([0, 0, 0]);
    })

    it('sub 3', () => {
        const a = NdArray.fromArray([1, 2, 3]);
        const b = NdArray.fromArray([1, 2, 3]);
        expect(a.sub(b).data).toEqual([0, 0, 0]);
    })
    it('sub 4', () => {
        const a = NdArray.fromArray([1, 2, 3]);
        expect(a.sub(2).data).toEqual([-1, 0, 1]);
    })


    it('sub assign 1', () => {
        const a = NdArray.fromArray([1, 2, 3]);
        ops.subAssign(a, 2);
        expect(a.data).toEqual([-1, 0, 1]);
    })
    it('sub assign 2', () => {
        const a = NdArray.fromArray([1, 2, 3]);
        const b = NdArray.fromArray([1, 2, 3]);
        a.subAssign(b);
        expect(a.data).toEqual([0, 0, 0]);
    })

    it('sub assign 3', () => {
        const a = NdArray.fromArray([1, 2, 3]);
        const b = NdArray.fromArray([1, 2, 3]);
        a.subAssign(b);
        expect(a.data).toEqual([0, 0, 0]);
    })
    it('sub assign 4', () => {
        const a = NdArray.fromArray([1, 2, 3]);
        a.subAssign(2);
        expect(a.data).toEqual([-1, 0, 1]);
    })

})
