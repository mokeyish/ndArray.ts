import { NdArray } from '../nd-array';
import { Rank } from '../types';


export function transpose<T>(x: NdArray<T, Rank.R2>): NdArray<T, Rank.R2> {
    const out = NdArray.fill([x.shape[1], x.shape[0]], undefined as unknown as T, x.dtype);
    const iter = x.iter();
    while (iter.moveNext()) {
        const [row, col] = iter.axesIndex;
        const val = iter.current;
        out.set([col, row], val);
    }
    return out;
}
