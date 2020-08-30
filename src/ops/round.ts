import { NdArray } from '../nd-array';
import { Rank } from '../types';


export function round(x: number): number;
export function round(x: number[]): number[];
export function round<R extends Rank>(x: NdArray<number, R>): NdArray<number, R>;
export function round<R extends Rank>(x: NdArray<number, R> | number | number[]): NdArray<number, R> | number | number[] {
    if (typeof x === 'number') {
        return Math.round(x);
    }
    if (x instanceof Array) {
        return x.map(Math.round);
    }
    return x.map(Math.round);
}
