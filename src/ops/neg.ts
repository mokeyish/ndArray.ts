
import { INumericNdArray, Ix } from '../interface';

export function neg(val: number[]): number[];
export function neg<D extends Ix>(val: INumericNdArray<D>): INumericNdArray<D>;
export function neg<D extends Ix>(val: INumericNdArray<D> | number[] ): INumericNdArray<D> | number[] {
    if (val instanceof Array) {
        return val.map(v => -v);
    } else {
        return val.map(v => -v, val.dtype);
    }
}
