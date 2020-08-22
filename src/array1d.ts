import { Array1D, DataType } from './types';
import { NdArray } from './nd-array';


export function array1d<T>(data: T[], dtype: DataType = 'generic'): Array1D<T> {
    return NdArray.fromArray(data, [data.length] , dtype);
}
