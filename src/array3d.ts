import { Array3D, DataType, Ix3 } from './interface';
import { NdArray } from './nd-array';


export function array3d<T>(data: T[], shape: Ix3, dtype: DataType = 'generic'): Array3D<T> {
    return NdArray.array3d(data, shape, dtype);
}
