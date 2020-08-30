import { NdArray } from '../nd-array';
import { Rank } from '../types';

export function abs(x: number): number;
export function abs(x: number[]): number[];
export function abs<R extends Rank>(x: NdArray<number, R>): NdArray<number, R>;
export function abs<R extends Rank>(x: NdArray<number, R> | number | number[]): NdArray<number, R> | number | number[] {
    if (typeof x === 'number') {
        return Math.abs(x);
    }
    if (x instanceof Array) {
        return x.map(Math.abs);
    }
    return x.map(Math.abs);
}
