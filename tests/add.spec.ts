
import { NdArray, ops } from '../src';

describe('NdArray add', () => {
    it('add 1', () => {
        const a = NdArray.fromArray([1, 2, 3]);
        expect(ops.add(a, 2).data).toEqual([3, 4, 5]);
    })
    it('add 2', () => {
        const a = NdArray.fromArray([1, 2, 3]);
        const b = NdArray.fromArray([1, 2, 3]);
        expect(ops.add(a, b).data).toEqual([2, 4, 6]);
    })

    it('add 3', () => {
        const a = NdArray.fromArray([1, 2, 3]);
        const b = NdArray.fromArray([1, 2, 3]);
        expect(a.add(b).data).toEqual([2, 4, 6]);
    })
    it('add 4', () => {
        const a = NdArray.fromArray([1, 2, 3]);
        expect(a.add(2).data).toEqual([3, 4, 5]);
    })


    it('add assign 1', () => {
        const a = NdArray.fromArray([1, 2, 3]);
        ops.addAssign(a, 2);
        expect(a.data).toEqual([3, 4, 5]);
    })
    it('add assign 2', () => {
        const a = NdArray.fromArray([1, 2, 3]);
        const b = NdArray.fromArray([1, 2, 3]);
        a.addAssign(b);
        expect(a.data).toEqual([2, 4, 6]);
    })

    it('add assign 3', () => {
        const a = NdArray.fromArray([1, 2, 3]);
        const b = NdArray.fromArray([1, 2, 3]);
        a.addAssign(b);
        expect(a.data).toEqual([2, 4, 6]);
    })
    it('add assign 4', () => {
        const a = NdArray.fromArray([1, 2, 3]);
        a.addAssign(2);
        expect(a.data).toEqual([3, 4, 5]);
    })

})
