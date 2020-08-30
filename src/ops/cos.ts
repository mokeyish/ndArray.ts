import { NdArray } from '../nd-array';
import { Rank } from '../types';

export function cos(x: number): number;
export function cos(x: number[]): number[];
export function cos<R extends Rank>(x: NdArray<number, R>): NdArray<number, R>;
export function cos<R extends Rank>(x: NdArray<number, R> | number | number[]): NdArray<number, R> | number | number[] {
    if (typeof x === 'number') {
        return Math.cos(x);
    }
    if (x instanceof Array) {
        return x.map(Math.cos);
    }
    return x.map(Math.cos);
}
