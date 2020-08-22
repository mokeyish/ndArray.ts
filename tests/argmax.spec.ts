import { array1d, array2d, ops } from '../src';

describe('NdArray argmax', () => {
    it('number array', () => {
        const a = [1, 2, 35, 2, 5];
        expect(ops.argmax(a)).toEqual(2);
    })

    it('number array', () => {
        const a = array1d([1, 2, 35, 2, 5]);
        expect(ops.argmax(a)).toEqual(2);
    })

    it('1d array', () => {
        const a = array1d([1, 2, 35, 2, 5]);
        expect(a.argmax()).toEqual(2);
    })

    it('2d array axis 0', () => {
        const a = array2d([1, 2, 3, 4, 5, 6, 7, 8, 9], [3, 3]);
        expect(a.argmax(0).ndArray()).toEqual([2, 2, 2]);
    })

    it('2d array axis 00', () => {
        const a = array2d([1, 2, 3, 4, 5, 6, 7, 8, 9], [3, 3]);
        expect(ops.argmax(a)).toEqual(8);
    })

    it('2d array axis 01', () => {
        const a = array2d([1, 2, 3, 4, 5, 6, 7, 8, 9], [3, 3]);
        expect(ops.argmax(a, 0).ndArray()).toEqual([2, 2, 2]);
    })

    it('2d array axis 1', () => {
        const a = array2d([1, 2, 3, 4, 5, 6, 7, 8, 9], [3, 3]);
        expect(a.argmax(1).ndArray()).toEqual([2, 2, 2]);
    })
})
