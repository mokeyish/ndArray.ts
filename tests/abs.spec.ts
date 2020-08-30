import { NdArray } from '../src';

describe('NdArray abs', () => {
    it('abs 1', () => {
        const a = NdArray.fromArray([
            [1, -2, -3],
            [5, -6, -7],
        ]);
        expect(a.abs().ndArray()).toEqual([
            [1, 2, 3],
            [5, 6, 7],
        ])
    })
})
