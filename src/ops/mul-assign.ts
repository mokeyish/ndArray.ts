import { Rank } from '../types';
import { NdArray } from '../nd-array';

export function mulAssign<R extends Rank>(ndArray: NdArray<number, R>, x: NdArray<number, R> | number): void {
    if (typeof x === 'number') {
        const iter = ndArray.iter();
        while (iter.moveNext()) {
            const axesIndex = iter.axesIndex;
            const a = ndArray.get(...axesIndex);
            ndArray.set(axesIndex, a * x);
        }
    } else {
        const iter = ndArray.iter();
        while (iter.moveNext()) {
            const axesIndex = iter.axesIndex;
            const a = ndArray.get(...axesIndex);
            const b = x.get(...axesIndex);
            ndArray.set(axesIndex, a * b);
        }
    }
}
