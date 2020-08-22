import { array2d } from '../src';


describe('NdArray reshape', () => {
    it('should equal',  () => {
        const a = array2d([1, 2, 3, 4], [2, 2]);
        const b = a.reshape([4]);
        expect(a).toEqual(b);
        expect(a === b as any).toEqual(true);
    });
})
