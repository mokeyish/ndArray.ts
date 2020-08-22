import { NdArray } from '../src';


describe('NdArray matrix', () => {
    it('row', () => {
        const p = NdArray.fromArray([
            [1, 2],
            [3, 4]
        ])
        expect(p.row(0)).toEqual([1, 2]);
        expect(p.row(1)).toEqual([3, 4]);
    })
    it('col', () => {
        const p = NdArray.fromArray([
            [1, 2],
            [3, 4]
        ])
        expect(p.col(0)).toEqual([1, 3]);
        expect(p.col(1)).toEqual([2, 4]);
    })

    it('matmul', () => {
        const a = NdArray.fromArray([
            [1, 2, 3],
            [3, 4, 5]
        ])
        const b = NdArray.fromArray([
            [1, 2],
            [3, 4],
            [3, 4]
        ])
        // expect(a.matmul(b)).toEqual([1, 3]);
    })
})
