import { array1d, array2d, ops } from '../src';

describe('NdArray cumsum', () => {
    it('1d', () => {
        const a = array1d([1, 3, 5, 7, 9]);
        const b = a.cumsum();
        expect(b.ndArray()).toEqual([1, 4, 9, 16, 25]);
    })

    it('1d ops', () => {
        const a = [1, 3, 5, 7, 9];
        expect(ops.cumsum(a).ndArray()).toEqual([1, 4, 9, 16, 25]);
    })

    it('2d', () => {
        const a = array2d([1, 3, 5, 7, 9, 11], [3, 2]);
        const b = a.cumsum();
        expect(b.data).toEqual([1, 4, 9, 16, 25, 36]);
    })

    it('2d with axis 0', () => {
        const a = array2d([1, 2, 3, 4, 5, 6, 7, 8, 9], [3, 3]);
        const b = a.cumsum(0);
        expect(b.ndArray()).toEqual([
            [1, 2, 3],
            [5, 7, 9],
            [12, 15, 18]
        ]);
    })

    it('2d with axis 1', () => {
        const a = array2d([1, 2, 3, 4, 5, 6, 7, 8, 9], [3, 3]);
        const b = a.cumsum(1);
        expect(b.ndArray()).toEqual([
            [1, 3, 6],
            [4, 9, 15],
            [7, 15, 24]
        ]);
    })
})
