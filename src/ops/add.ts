import { NdArray } from '../nd-array';
import { Rank } from '../types';

export function add<R extends Rank>(ndArray: NdArray<number, R>, x: NdArray<number, R> | number): NdArray<number, R> {
    if (typeof x === 'number') {
        return ndArray.map(v => v + x);
    } else {
        return ndArray.map((v, _, i) => v + x.data[i]);
    }
}
