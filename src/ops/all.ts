import { iterAxes, reduceAxes } from '../utils';
import { NdArray } from '../nd-array';
import { Rank, RankDown, ShapeMap } from '../types';

export function all<T, R extends Rank>(ndArray: NdArray<number, R>): boolean;
export function all<T, R extends Rank>(ndArray: NdArray<number, R>, axis: number): NdArray<boolean, RankDown[R]>;
export function all<T, R extends Rank>(ndArray: NdArray<number, R>, axis?: number): NdArray<boolean, RankDown[R]> | boolean;
export function all<T, R extends Rank>(ndArray: NdArray<number, R>, axis?: number): NdArray<boolean, RankDown[R]> | boolean {
    const shape = ndArray.shape;
    if (axis === undefined || shape.length === 1) {
        return ndArray.data.every((v) => v !== 0);
    }
    if (axis < 0 || axis >= shape.length) {
        throw new Error('axis out of shape range');
    }
    const reduceShape = reduceAxes(shape, axis);
    const ret = NdArray.fromArray<boolean, RankDown[R]>(
        Array(reduceShape.prod()), reduceShape);

    let axes = Array(shape.length).fill(0) as ShapeMap[R];

    while (true) {
        const a = [];
        for (let i = 0; i < shape[axis]; i++) {
            axes[axis] = i;
            a.push(ndArray.get(...axes));
        }
        const val = a.every((v: any) => v !== 0);
        ret.set(reduceAxes(axes, axis), val);
        const t = iterAxes(axes, shape, axis);
        if (t) {
            axes = t;
            continue;
        }
        break;
    }
    return ret;
}
