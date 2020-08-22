import { array1d, array2d, NdArray } from '../src';


describe('NdArray fromArray', () => {
    it('1D-1', () => {
        const a = array1d([1, 2, 3]);
        expect(a.shape.length).toEqual(1);
        expect(a.shape[0]).toEqual(3);
    })
    it('1D-2', () => {
        const a = array1d([1, 2, 3]);
        expect(a.shape.length).toEqual(1);
        expect(a.shape[0]).toEqual(3);
    })
    it('1D-3', () => {
        const a = NdArray.fromArray([1, 2, 3]);
        expect(a.shape.length).toEqual(1);
        expect(a.shape[0]).toEqual(3);
    })

    it('2D-1', () => {
        const a = array2d([1, 2, 3, 4], [2, 2]);
        expect(a.shape.length).toEqual(2);
        expect(a.shape[0]).toEqual(2);
    })
    it('2D-2', () => {
        const a = array2d([1, 2, 3, 4], [2, 2]);
        expect(a.shape.length).toEqual(2);
        expect(a.shape[0]).toEqual(2);
    })
    it('2D-3', () => {
        const a = NdArray.fromArray([[1, 2], [3, 4]]);
        expect(a.shape.length).toEqual(2);
        expect(a.shape[0]).toEqual(2);
    })
})
