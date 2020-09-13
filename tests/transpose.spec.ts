import { NdArray } from '../src';


describe('NdArray transpose', () => {
    it('transpose 1', () => {
        const a = NdArray.fromArray([
            [1, 2],
            [3, 4]
        ]);

        const b = a.t();

        expect(b.ndArray()).toEqual( [
            [1, 3],
            [2, 4]
        ])
    })

    it('transpose 2', () => {
        const a = NdArray.fromArray([
            [1, 2]
        ]);

        const b = a.t();

        expect(b.ndArray()).toEqual( [
            [1],
            [2]
        ])
    })
})
