import { array1d } from '../array1d';
import { iterAxes } from '../utils';
import { NdArray } from '../nd-array';
import { Array1D, Rank, ShapeMap } from '../types';

export function cumsum<R extends Rank>(ndArray: NdArray<number, R> | number[]): Array1D<number>;
export function cumsum<R extends Rank>(ndArray: NdArray<number, R>, axis?: number): NdArray<number, R>;
export function cumsum<R extends Rank>(ndArray: NdArray<number, R> | number[], axis?: number): NdArray<number, R> | Array1D<number> {
    if (axis === undefined || ndArray instanceof Array) {
        let sum = 0;
        let data: number[];
        if (ndArray instanceof Array) {
            data = ndArray.map((v) => sum = sum + v);
        } else {
            data = ndArray.data.map((v) => sum = sum + v);
        }
        return array1d(data);
    }

    const shape = ndArray.shape;
    if (axis < 0 || axis >= shape.length) {
        throw new Error('axis out of shape range');
    }

    const ret = NdArray.fromArray(Array<number>(shape.reduce((p, c) => p * c)), shape) as unknown as NdArray<number, R>;

    let axes = Array<number>(shape.length).fill(0) as ShapeMap[R];
    while (true) {
        let cumulativeSum = 0;
        for (let i = 0; i < shape[axis]; i++) {
            axes[axis] = i;
            cumulativeSum += ndArray.get(...axes);
            ret.set(axes, cumulativeSum);
        }
        const t = iterAxes(axes, shape, axis);
        if (t) {
            axes = t;
            continue;
        }
        break;
    }
    return ret;
}

