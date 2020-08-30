import { NdArray } from '../src';


describe('NdArray matmul', () => {
    it('matmul', () => {
        const a = NdArray.fromArray([
            [1, 2, 3],
            [4, 5, 6]
        ])

        const b = NdArray.fromArray([
            [1, 2],
            [3, 4],
            [5, 6]
        ])
        const c = a.matmul(b);

        expect(c.ndArray()).toEqual([
            [22, 28],
            [49, 64]
        ])
    })
})
