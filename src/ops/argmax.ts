import { NdArray } from '../nd-array';
import { Rank, RankDown } from '../types';
import { arrayAxisOps } from './utils';

/**
 * Returns the indices of the maximum values along an axis.
 * @param ndArray
 */
export function argmax(ndArray: number[]): number;
export function argmax<R extends Rank>(ndArray: NdArray<number, R>): number;
export function argmax<R extends Rank>(ndArray: NdArray<number, R>, axis: number): NdArray<number, RankDown[R]>;
export function argmax<R extends Rank>(ndArray: NdArray<number, R>, axis?: number): NdArray<number, RankDown[R]> | number;
export function argmax<R extends Rank>(ndArray: NdArray<number, R> | number[], axis?: number): NdArray<number, RankDown[R]> | number {
    return arrayAxisOps((data) => data.argmax(), ndArray, axis);
}
