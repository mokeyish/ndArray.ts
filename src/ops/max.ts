import { Rank, RankDown } from '../types';
import { NdArray } from '../nd-array';
import { arrayAxisOps } from './utils';

/**
 * Return the maximum of an array or maximum along an axis.
 * @param ndArray
 */
export function max<R extends Rank>(ndArray: NdArray<number, R> | number[]): number;
export function max<R extends Rank>(ndArray: NdArray<number, R>, axis: number): NdArray<number, RankDown[R]>;
export function max<R extends Rank>(ndArray: NdArray<number, R>, axis?: number): NdArray<number, RankDown[R]> | number;
export function max<R extends Rank>(ndArray: NdArray<number, R> | number[] , axis?: number): NdArray<number, RankDown[R]> | number {
    return arrayAxisOps((data) => data.max(), ndArray, axis);
}
