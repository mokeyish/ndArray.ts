import { Array3D, DataType, Rank, ShapeMap } from './types';
import { NdArray } from './nd-array';


export function array3d<T>(data: T[], shape: ShapeMap[Rank.R3], dtype: DataType = 'generic'): Array3D<T> {
    return NdArray.fromArray(data, shape, dtype);
}
