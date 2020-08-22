import { iterAxes, reduceAxes } from '../utils';
import { Rank, RankDown, ShapeMap } from '../types';
import { NdArray } from '../nd-array';


export function sum<R extends Rank>(ndArray: NdArray<number, R> | number[]): number;
export function sum<R extends Rank>(ndArray: NdArray<number, R>, axis: number): NdArray<number, RankDown[R]>;
export function sum<R extends Rank>(ndArray: NdArray<number, R>, axis?: number): NdArray<number, RankDown[R]> | number;
export function sum<R extends Rank>(ndArray: NdArray<number, R> | number[] , axis?: number): NdArray<number, RankDown[R]> | number {
    if (ndArray instanceof Array) {
        return ndArray.reduce((p, c) => p + c);
    }
    const shape = ndArray.shape;
    if (axis === undefined || shape.length === 1) {
        return ndArray.data.reduce((p, c) => p + c);
    }
    if (axis < 0 || axis >= shape.length) {
        throw new Error('axis out of shape range');
    }
    const reduceShape = reduceAxes(shape, axis);
    const ret = NdArray.fromArray<number, RankDown[R]>(Array(reduceShape.prod()), reduceShape);

    let axes = Array<number>(shape.length).fill(0) as ShapeMap[R];
    while (true) {
        const a = [];
        for (let i = 0; i < shape[axis]; i++) {
            axes[axis] = i;
            a.push(ndArray.get(...axes));
        }
        const sum1 = a.reduce((p: number, c: number) => p + c);
        ret.set(reduceAxes(axes, axis), sum1);
        const t = iterAxes(axes, shape, axis);
        if (t) {
            axes = t;
            continue;
        }
        break;
    }
    return ret;
}
