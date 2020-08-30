import { NdArray } from '../src';


describe('NdArray linspace', () => {
    it('1d', () => {
        const a = NdArray.linspace(0, 4, 9);
        expect(a.data).toEqual([
            0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4
        ])
    })
    it('2d', () => {
        const a = NdArray.linspace([0, 4], [4, 8, 8], 9);
        expect(a.ndArray()).toEqual([
            [0, 4], [0.5, 4.5], [1, 5], [1.5, 5.5], [2, 6], [2.5, 6.5], [3, 7], [3.5, 7.5], [4, 8]
        ])
    })
})
