
import { array1d, array2d, array3d, NdArray } from '../dist';

describe('nd-array', () => {
    it('1d', () => {
        const a = array1d(['a', 'b', 'c', 'd']);
        expect(a.get(1)).toEqual('b');
        expect(a.rank).toEqual(1);
    })
    it('2d', () => {
        const a = array2d([
            'a1', 'b1',
            'c1', 'd1'
        ], [2, 2]);

        expect(a.get(0, 0)).toEqual('a1');
        expect(a.get(1, 0)).toEqual('c1');
        expect(a.rank).toEqual(2);
    })
    it('radix', () => {
        const data: number [] = Array(24);
        for (let i = 0; i < data.length; i++) {
            data[i] = i + 1;
        }
        const a = NdArray.fromArray(data, [4, 3, 2], 'uint16');
        const na = a.ndArray();
        expect(a.dtype).toEqual('uint16');
        expect(na[2][2][1]).toEqual(a.get(2, 2, 1));
    })

    it('index', () => {
        const data: number [] = Array(24);
        for (let i = 0; i < data.length; i++) {
            data[i] = i + 1;
        }
        const a = NdArray.fromArray(data, [4, 3, 2], 'uint16');
        const index = a.index(2, 2, 1);
        const axes = a.axes(index);
        expect(axes[0]).toEqual(2);
        expect(axes[1]).toEqual(2);
        expect(axes[2]).toEqual(1);
    })

    it('full',  () => {
        const x = NdArray.full([2, 2], Infinity);
        const d = x.ndArray();
        expect(d.length).toEqual(2);
    });
    it('map', () => {
        const a = array2d([1, 2, -Infinity, 4, Infinity, 6], [2, 3]);
        const b = a.map((v) => -Infinity < v);
        expect(b.get(0, 0)).toEqual(true);
        expect(b.get(0, 1)).toEqual(true);
        expect(b.get(0, 2)).toEqual(false);


        expect(b.get(1, 0)).toEqual(true);
        expect(b.get(1, 1)).toEqual(true);
        expect(b.get(1, 2)).toEqual(true);
    })
    it('sum',  () => {
        const a = array2d([1, 2, 3, 4, 5, 6, 7, 8, 9], [3, 3]);
        expect(a.sum()).toEqual(45);
        const s0 = a.sum(0);
        const s1 = a.sum(1);
        expect(s0.ndArray()).toEqual([12, 15, 18]);
        expect(s1.ndArray()).toEqual([6, 15, 24]);
    });

    it('sum1',  () => {
        const a = array3d([1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9], [3, 3, 2]);
        expect(a.sum()).toEqual(90);
        const s0 = a.sum(0).ndArray();
        const s1 = a.sum(1).ndArray();
        const s2 = a.sum(2).ndArray();
        expect(s0).toEqual([
            [12, 12],
            [15, 15],
            [18, 18]
        ]);
        expect(s1).toEqual([
            [6, 6],
            [15, 15],
            [24, 24]
        ]);
        expect(s2).toEqual([
            [2, 4, 6],
            [8, 10, 12],
            [14, 16, 18]
        ]);
    });

    it('all',  () => {
        const a = array2d([1, 2, 3, 4, 5, 6, 7, 8, 9], [3, 3]);
        expect(a.all()).toEqual(true);
    });
    it('all1',  () => {
        const a = array2d([1, 2, 3, 4, 5, 6, 7, 8, 0], [3, 3]);
        expect(a.all()).toEqual(false);
    });

    it('all2',  () => {
        const a = array3d([1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 0, 9, 9], [3, 3, 2]);
        expect(a.all()).toEqual(false);
        const a0 = a.all(0).ndArray();
        const a1 = a.all(1).ndArray();
        const a2 = a.all(2).ndArray();
        expect(a0).toEqual([
            [true, true],
            [true, false],
            [true, true]
        ]);
        expect(a1).toEqual([
            [true, true],
            [true, true],
            [true, false]
        ]);
        expect(a2).toEqual([
            [true, true, true],
            [true, true, true],
            [true, false, true]
        ])
    });
})
