import { Array5D, DataType, Rank, ShapeMap } from './types';
import { NdArray } from './nd-array';


export function array5d<T>(data: T[], shape: ShapeMap[Rank.R5], dtype: DataType = 'generic'): Array5D<T> {
    return NdArray.fromArray(data, shape, dtype);
}
