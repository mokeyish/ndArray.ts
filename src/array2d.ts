import { NdArray } from './nd-array';
import { Array2D, DataType, Rank, ShapeMap } from './types';

export function array2d<T>(data: T[], shape: ShapeMap[Rank.R2], dtype: DataType = 'generic'): Array2D<T> {
    return NdArray.fromArray(data, shape, dtype);
}
