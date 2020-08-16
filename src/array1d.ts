
import { NdArray } from './nd-array';
import { Array1D, DataType, Ix1 } from './interface';

export function array1d<T>(data: T[], shape?: Ix1, dtype: DataType = 'generic'): Array1D<T> {
    return NdArray.array1d(data, shape, dtype);
}
