export * as ops from './ops';
export * from './array1d';
export * from './array2d';
export * from './array3d';
export * from './array4d';
export * from './array5d';
export * from './array6d';
export * from './nd-array';
export { castIndexToAxes, castAxesToIndex } from './utils';


export {
    int8, uint8, int16, uint16,
    int32, uint32, float32, float64, DataType,
    Rank, InferRank, ShapeMap, ArrayMap, InferIx,
    IxA, Ix1, Ix2, Ix3, Ix4, Ix5, Ix6,
    Array1D, Array2D, Array3D, Array4D, Array5D, Array6D,
    ArrayLike1D, ArrayLike2D, ArrayLike3D, ArrayLike4D, ArrayLike5D, ArrayLike6D
} from './types';
