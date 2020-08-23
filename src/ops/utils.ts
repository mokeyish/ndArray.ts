import { Rank, RankDown, ShapeMap } from '../types';
import { NdArray } from '../nd-array';
import { iterAxes, reduceAxes } from '../utils';


export function arrayAxisOps<R extends Rank>(callbackfn: (array: ReadonlyArray<number>) => number, ndArray: NdArray<number, R> | number[] , axis?: number): NdArray<number, RankDown[R]> | number {
    if (ndArray instanceof Array) {
        return callbackfn(ndArray);
    }
    const shape = ndArray.shape;
    if (axis === undefined || shape.length === 1) {
        return callbackfn(ndArray.data);
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
        ret.set(reduceAxes(axes, axis), callbackfn(a));
        const t = iterAxes(axes, shape, axis);
        if (t) {
            axes = t;
            continue;
        }
        break;
    }
    return ret;
}
