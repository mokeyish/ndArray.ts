import { INdArray, Ix, IxD } from '../interface';
import { iterAxes, reduceAxes } from '../utils';
import { NdArray } from '../nd-array';

export function all<T, D extends Ix>(ndArray: INdArray<T, D>): boolean;
export function all<T, D extends Ix>(ndArray: INdArray<T, D>, axis: number): INdArray<boolean, IxD<D>>;
export function all<T, D extends Ix>(ndArray: INdArray<T, D>, axis: number | undefined): boolean | INdArray<boolean, IxD<D>>;
export function all<T, D extends Ix>(ndArray: INdArray<T, D>, axis?: number): boolean | INdArray<boolean, IxD<D>> {
    const shape = ndArray.shape;
    if (axis === undefined || shape.length === 1) {
        return ndArray.data.every((v: any) => v !== 0);
    }
    if (axis < 0 || axis >= shape.length) {
        throw new Error('axis out of shape range');
    }
    const reduceShape = reduceAxes(shape, axis);
    const ret = NdArray.fromArray<boolean, IxD<D>>(
        Array<boolean>(reduceShape.reduce((p, c) => p * c)), reduceShape);

    let axes = Array<number>(shape.length).fill(0) as D;
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
