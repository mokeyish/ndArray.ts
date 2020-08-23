import { NdArray } from '../src';


describe('NdArray avg', () => {
    it('2d', () => {
        const a = NdArray.fromArray([
            [1, 2, 3],
            [11, 22, 33],
            [0, 3, 3],
        ])

        expect(Math.floor(a.avg())).toEqual(8);
        expect(a.avg(0).ndArray()).toEqual([4, 9, 13]);
    })
})
