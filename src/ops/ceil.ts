import { NdArray } from '../nd-array';
import { Rank } from '../types';

export function ceil(x: number): number;
export function ceil(x: number[]): number[];
export function ceil<R extends Rank>(x: NdArray<number, R>): NdArray<number, R>;
export function ceil<R extends Rank>(x: NdArray<number, R> | number | number[]): NdArray<number, R> | number | number[] {
    if (typeof x === 'number') {
        return Math.ceil(x);
    }
    if (x instanceof Array) {
        return x.map(Math.ceil);
    }
    return x.map(Math.ceil);
}
