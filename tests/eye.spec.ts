import { NdArray } from '../src';


describe('NdArray eye', () => {
    it('n3', () => {
        const a = NdArray.eye(3);
        const b = a.ndArray();
        expect(b).toEqual([
            [1., 0., 0.],
            [0., 1., 0.],
            [0., 0., 1.]
        ])
    })
    it('n3m4', () => {
        const a = NdArray.eye(3, 4);
        expect(a.ndArray()).toEqual([
            [1., 0., 0., 0.],
            [0., 1., 0., 0.],
            [0., 0., 1., 0.]
        ])
    })

    it('n3m4k1', () => {
        const a = NdArray.eye(3, 4, 1);
        expect(a.ndArray()).toEqual([
            [0, 1., 0., 0.],
            [0, 0., 1., 0.],
            [0, 0., 0., 1.]
        ])
    })

    it('n4m3', () => {
        const a = NdArray.eye(4, 3);
        expect(a.ndArray()).toEqual([
            [1., 0., 0.],
            [0., 1., 0.],
            [0., 0., 1.],
            [0., 0., 0.]
        ])
    })
    it('n4m3k1', () => {
        const a = NdArray.eye(4, 3, 1);
        expect(a.ndArray()).toEqual([
            [0, 1., 0.],
            [0, 0., 1.],
            [0, 0., 0.],
            [0, 0., 0.]
        ])
    })
})
