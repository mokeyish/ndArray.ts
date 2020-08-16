import { NdArray } from './nd-array';
import { Array2D, DataType, Ix2 } from './interface';

export function array2d<T>(data: T[], shape: Ix2, dtype: DataType = 'generic'): Array2D<T> {
    return NdArray.array2d(data, shape, dtype);
}
