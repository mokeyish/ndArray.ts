import { NdArray } from '../nd-array';
import { Rank } from '../types';

export function neg(val: number): number;
export function neg(val: number[]): number[];
export function neg<R extends Rank>(val: NdArray<number, R>): NdArray<number, R>;
export function neg<R extends Rank>(val: NdArray<number, R> | number[] | number ): NdArray<number, R> | number[] | number {
    if (typeof val === 'number') {
        return -val;
    }
    if (val instanceof Array) {
        return val.map(v => -v);
    } else {
        return val.map(v => -v, val.dtype);
    }
}
