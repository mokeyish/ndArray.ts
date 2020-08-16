import { Array5D, DataType, Ix5 } from './interface';
import { NdArray } from './nd-array';


export function array5d<T>(data: T[], shape: Ix5, dtype: DataType = 'generic'): Array5D<T> {
    return NdArray.array5d(data, shape, dtype);
}
