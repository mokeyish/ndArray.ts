import { NdArray } from '../nd-array';
import { Rank } from '../types';

export function tan(x: number): number;
export function tan(x: number[]): number[];
export function tan<R extends Rank>(x: NdArray<number, R>): NdArray<number, R>;
export function tan<R extends Rank>(x: NdArray<number, R> | number | number[]): NdArray<number, R> | number | number[] {
    if (typeof x === 'number') {
        return Math.tan(x);
    }
    if (x instanceof Array) {
        return x.map(Math.tan);
    }
    return x.map(Math.tan);
}
