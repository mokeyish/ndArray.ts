import { NdArray } from '../nd-array';
import { Rank } from '../types';


export function sin(x: number): number;
export function sin(x: number[]): number[];
export function sin<R extends Rank>(x: NdArray<number, R>): NdArray<number, R>;
export function sin<R extends Rank>(x: NdArray<number, R> | number | number[]): NdArray<number, R> | number | number[] {
    if (typeof x === 'number') {
        return Math.sin(x);
    }
    if (x instanceof Array) {
        return x.map(Math.sin);
    }
    return x.map(Math.sin);
}
