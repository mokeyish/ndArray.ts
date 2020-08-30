import { NdArray } from '../nd-array';
import { Rank } from '../types';

export function floor(x: number): number;
export function floor(x: number[]): number[];
export function floor<R extends Rank>(x: NdArray<number, R>): NdArray<number, R>;
export function floor<R extends Rank>(x: NdArray<number, R> | number | number[]): NdArray<number, R> | number | number[] {
    if (typeof x === 'number') {
        return Math.floor(x);
    }
    if (x instanceof Array) {
        return x.map(Math.floor);
    }
    return x.map(Math.floor);
}
