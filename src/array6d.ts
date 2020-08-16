import { Array6D, DataType, Ix6 } from './interface';
import { NdArray } from './nd-array';

export function array6d<T>(data: T[], shape: Ix6, dtype: DataType = 'generic'): Array6D<T> {
    return NdArray.array6d(data, shape, dtype);
}
