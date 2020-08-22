import { Array4D, DataType, Rank, ShapeMap } from './types';
import { NdArray } from './nd-array';

export function array4d<T>(data: T[], shape: ShapeMap[Rank.R4], dtype: DataType = 'generic'): Array4D<T> {
    return NdArray.fromArray(data, shape, dtype);
}
