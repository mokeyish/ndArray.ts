import { NdArray } from '../src';

describe('NdArray iter', () => {

    it('1', () => {
        const a = NdArray.range(16).reshape([4, 4]);
        const iter = a.iter();

        let i = 0;
        while (iter.moveNext()) {
            expect(iter.index).toEqual(i++);
            const [y, x] = iter.axesIndex;
            expect(y).toEqual(Math.floor(iter.index / 4));
            expect(x).toEqual(iter.index % 4);
        }
    })
})
