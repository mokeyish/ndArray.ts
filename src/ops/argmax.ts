import { NdArray } from '../nd-array';
import { Rank, RankDown, ShapeMap } from '../types';
import { iterAxes, reduceAxes } from '../utils';


export function argmax(ndArray: number[]): number;
export function argmax<R extends Rank>(ndArray: NdArray<number, R>): number;
export function argmax<R extends Rank>(ndArray: NdArray<number, R>, axis: number): NdArray<number, RankDown[R]>;
export function argmax<R extends Rank>(ndArray: NdArray<number, R>, axis?: number): NdArray<number, RankDown[R]> | number;
export function argmax<R extends Rank>(ndArray: NdArray<number, R> | number[], axis?: number): NdArray<number, RankDown[R]> | number {
    if (ndArray instanceof Array) {
        let arg = 0;
        let val = ndArray[0];
        for (let i = 1; i < ndArray.length; i++) {
            const v = ndArray[i];
            if (v > val) {
                val = v;
                arg = i;
            }
        }
        return arg;
    }
    const shape = ndArray.shape;
    if (axis === undefined || shape.length === 1) {

        let arg = 0;
        let val = ndArray.data[0];
        for (let i = 1; i < ndArray.length; i++) {
            const v = ndArray.data[i];
            if (v > val) {
                val = v;
                arg = i;
            }
        }
        return arg;
    }
    if (axis < 0 || axis >= shape.length) {
        throw new Error('axis out of shape range');
    }
    const reduceShape = reduceAxes(shape, axis);
    const ret = NdArray.fromArray<number, RankDown[R]>(Array(reduceShape.prod()), reduceShape);

    let axes = Array<number>(shape.length).fill(0) as ShapeMap[R];
    while (true) {
        axes[axis] = 0;
        let arg = 0;
        let val = ndArray.get(...axes);
        for (let i = 1; i < shape[axis]; i++) {
            axes[axis] = i;
            const v = ndArray.get(...axes);
            if (v > val) {
                val = v;
                arg = i;
            }
        }
        ret.set(reduceAxes(axes, axis), arg);
        const t = iterAxes(axes, shape, axis);
        if (t) {
            axes = t;
            continue;
        }
        break;
    }
    return ret;
}
