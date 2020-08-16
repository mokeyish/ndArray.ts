import { INumericNdArray, Ix, Ix1, IxD } from '../interface';
import { iterAxes, reduceAxes } from '../utils';
import { NdArray } from '../nd-array';


export function sum<D extends Ix>(ndArray: INumericNdArray<D> | number[]): number;
export function sum<D extends Ix>(ndArray: INumericNdArray<D>, axis: number): INumericNdArray<IxD<D>>;
export function sum<D extends Ix>(ndArray: INumericNdArray<D>, axis: number | undefined):  number | INumericNdArray<IxD<D>>;
export function sum<D extends Ix>(ndArray: INumericNdArray<D> | number[] , axis?: number): number | INumericNdArray<IxD<D>> {
    if (ndArray instanceof Array) {
        return ndArray.reduce((p, c) => p + c);
    }
    const shape = ndArray.shape;
    if (axis === undefined || shape.length === 1) {
        return ndArray.data.reduce((p: any, c: any) => p + c);
    }
    if (axis < 0 || axis >= shape.length) {
        throw new Error('axis out of shape range');
    }
    const reduceShape = reduceAxes(shape, axis);
    const ret = NdArray.fromArray<number, IxD<D>>(Array<number>(reduceShape.reduce((p, c) => p * c)), reduceShape);

    let axes = Array<number>(shape.length).fill(0) as D;
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
