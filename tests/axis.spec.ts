import { NdArray } from '../src';



describe('NdArray axis', () => {
    it('get axis', () => {
        const a = NdArray.fromArray([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]]);
        expect(a.get(0).data).toEqual([1, 2, 3]);
        expect(a.get(1).data).toEqual([4, 5, 6]);
        expect(a.get(2).data).toEqual([7, 8, 9]);
    })
    it('get axis 1', () => {
        const a = NdArray.fromArray([
            [[1, 11], [2, 22], [3, 33]],
            [[4, 44], [5, 55], [6, 66]],
            [[7, 77], [8, 88], [9, 99]]]);
        expect(a.get(0).ndArray()).toEqual([[1, 11], [2, 22], [3, 33]]);
        expect(a.get(0, 2).ndArray()).toEqual([3, 33]);
        expect(a.get(0).data).toEqual([1, 11, 2, 22, 3, 33]);
        expect(a.get(1).ndArray()).toEqual([[4, 44], [5, 55], [6, 66]]);
        expect(a.get(1).ndArray()).toEqual([[4, 44], [5, 55], [6, 66]]);
        expect(a.get(1).data).toEqual([4, 44, 5, 55, 6, 66]);
        expect(a.get(2).ndArray()).toEqual([[7, 77], [8, 88], [9, 99]]);
        expect(a.get(2).data).toEqual([7, 77, 8, 88, 9, 99]);
    })
    it('set axis 1', () => {
        const a = NdArray.fromArray([
            [[1, 11], [2, 22], [3, 33]],
            [[4, 44], [5, 55], [6, 66]],
            [[7, 77], [8, 88], [9, 99]]]);
        a.set([1], [[888, 888], [888, 888], [888, 888]]);
        expect(a.ndArray()).toEqual([
            [[1, 11], [2, 22], [3, 33]],
            [[888, 888], [888, 888], [888, 888]],
            [[7, 77], [8, 88], [9, 99]]]);
        a.set([0, 1], [555, 555]);
        expect(a.ndArray()).toEqual([
            [[1, 11], [555, 555], [3, 33]],
            [[888, 888], [888, 888], [888, 888]],
            [[7, 77], [8, 88], [9, 99]]]);
    })
    it('get axis 2', () => {
        const nS = 16;
        const nA = 4;
        const a = NdArray.ones([nS, nA]).div(4);
        expect(a.get(0).data).toEqual([0.25, 0.25, 0.25, 0.25]);
    })
})
