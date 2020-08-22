import { Rank } from '../types';
import { NdArray } from '../nd-array';

export function mul<R extends Rank>(ndArray: NdArray<number, R>, x: NdArray<number, R> | number): NdArray<number, R> {
    if (typeof x === 'number') {
        return ndArray.map(v => v * x);
    } else {
        return ndArray.map((v, _, i) => v * x.data[i]);
    }
}
