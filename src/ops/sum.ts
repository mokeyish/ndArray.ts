import { Rank, RankDown } from '../types';
import { NdArray } from '../nd-array';
import { arrayAxisOps } from './utils';


export function sum<R extends Rank>(ndArray: NdArray<number, R> | number[]): number;
export function sum<R extends Rank>(ndArray: NdArray<number, R>, axis: number): NdArray<number, RankDown[R]>;
export function sum<R extends Rank>(ndArray: NdArray<number, R>, axis?: number): NdArray<number, RankDown[R]> | number;
export function sum<R extends Rank>(ndArray: NdArray<number, R> | number[] , axis?: number): NdArray<number, RankDown[R]> | number {
    return arrayAxisOps((data) => data.sum(), ndArray, axis);
}
