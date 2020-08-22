
import { Array6D, DataType, Rank, ShapeMap } from './types';
import { NdArray } from './nd-array';


export function array6d<T>(data: T[], shape: ShapeMap[Rank.R6], dtype: DataType = 'generic'): Array6D<T> {
    return NdArray.fromArray(data, shape, dtype);
}
