import { Array4D, DataType, Ix4 } from './interface';
import { NdArray } from './nd-array';


export function array4d<T>(data: T[], shape: Ix4, dtype: DataType = 'generic'): Array4D<T> {
    return NdArray.array4d(data, shape, dtype);
}
