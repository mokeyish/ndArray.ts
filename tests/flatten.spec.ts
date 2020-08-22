import { NdArray } from '../src';


describe('NdArray flatten', () => {
    it('flatten 1', () => {
        const a = NdArray.fromArray([
            [[1, 11], [2, 22], [3, 33]],
            [[4, 44], [5, 55], [6, 66]],
            [[7, 77], [8, 88], [9, 99]]]);
        const b = a.flatten();

        expect(b.ndArray()).toEqual([
            1, 11, 2, 22, 3, 33,
            4, 44, 5, 55, 6, 66,
            7, 77, 8, 88, 9, 99]);
    })
})
