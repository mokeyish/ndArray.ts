import { NdArray } from './nd-array';

export const int8 = 'int8';
export const uint8 = 'uint8';
export const int16 = 'int16';
export const uint16 = 'uint16';
export const int32 = 'int32';
export const uint32 = 'uint32';
export const float32 = 'float32';
export const float64 = 'float64';

export type DataType = 'int8' | 'uint8' | 'int16' | 'uint16' | 'int32' | 'uint32' | 'float32' | 'float64' | 'generic';


export interface Dim<L extends number> extends Array<number> {
    0: number;
    length: L;
}

export type Ix = Dim<number>;
export type Ix1 = Dim<1>;
export type Ix2 = Dim<2>;
export type Ix3 = Dim<3>;
export type Ix4 = Dim<4>;
export type Ix5 = Dim<5>;
export type Ix6 = Dim<6>;

export type TypedArray = Float64Array | Float32Array | Int32Array | Uint32Array;

export type RegularArray<T> = T[] | T[][] | T[][][] | T[][][][] | T[][][][][] | T[][][][][][];


export enum Rank {
    R0 = 'R0',
    R1 = 'R1',
    R2 = 'R2',
    R3 = 'R3',
    R4 = 'R4',
    R5 = 'R5',
    R6 = 'R6'
}

export interface ShapeMap {
    R0: Dim<number>;
    R1: Dim<1>;
    R2: Dim<2>;
    R3: Dim<3>;
    R4: Dim<4>;
    R5: Dim<5>;
    R6: Dim<6>;
}

export interface RankDown {
    R0: never;
    R1: never;
    R2: Rank.R1;
    R3: Rank.R2;
    R4: Rank.R3;
    R5: Rank.R4;
    R6: Rank.R5;
}

export interface ArrayMap<T> {
    R0: T;
    R1: T[];
    R2: T[][];
    R3: T[][][];
    R4: T[][][][];
    R5: T[][][][][];
    R6: T[][][][][][];
}

export type InferRank<R extends Dim<number>> =
    R extends Ix1 ? Rank.R1 :
        R extends Ix2 ? Rank.R2 :
            R extends Ix3 ? Rank.R3 :
                R extends Ix4 ? Rank.R4 :
                    R extends Ix5 ? Rank.R5 :
                        R extends Ix6 ? Rank.R6 :
                            never;




// interface Ix {
//     R0: never;
//     R1: Dim<1>;
//     R2: Dim<2>;
//     R3: Dim<3>;
//     R4: Dim<4>;
//     R5: Dim<5>;
//     R6: Dim<6>;
// }

//
// export interface AxesA {
//     R0: never;
//     R1: Ix1;
//     R2: Ix2 | AxesA[Rank.R1];
//     R3: Ix3 | AxesA[Rank.R2];
//     R4: Ix4 | AxesA[Rank.R3];
//     R5: Ix5 | AxesA[Rank.R4];
//     R6: Ix6 | AxesA[Rank.R5];
// }

export type Array1D<T> = NdArray<T, Rank.R1>;
export type Array2D<T> = NdArray<T, Rank.R2>;
export type Array3D<T> = NdArray<T, Rank.R3>;
export type Array4D<T> = NdArray<T, Rank.R4>;
export type Array5D<T> = NdArray<T, Rank.R5>;
export type Array6D<T> = NdArray<T, Rank.R6>;

export type ArrayLike1D<T> = T[] | Array1D<T>;
export type ArrayLike2D<T> = T[][] | Array2D<T>;
export type ArrayLike3D<T> = T[][][] | Array3D<T>;
export type ArrayLike4D<T> = T[][][][] | Array4D<T>;
export type ArrayLike5D<T> = T[][][][][] | Array5D<T>;
export type ArrayLike6D<T> = T[][][][][][] | Array6D<T>;

export type NdArrayIn<T, R extends Rank, D extends Dim<number>> =
    R extends Rank.R1 ? T :
        R extends Rank.R2 ? (D extends ShapeMap[R] ? T : D extends Dim<1> ? ArrayLike1D<T> : never) :
            R extends Rank.R3 ? (D extends ShapeMap[R] ? T : D extends Dim<2> ? ArrayLike1D<T> : D extends Dim<1> ? ArrayLike2D<T> : never) :
                R extends Rank.R4 ? (D extends ShapeMap[R] ? T : D extends Dim<3> ? ArrayLike1D<T> : D extends Dim<2> ? ArrayLike2D<T> : D extends Dim<1> ? ArrayLike3D<T> : never) :
                    R extends Rank.R5 ? (D extends ShapeMap[R] ? T : D extends Dim<4> ? ArrayLike1D<T> : D extends Dim<3> ? ArrayLike2D<T> : D extends Dim<2> ? ArrayLike3D<T> : D extends Dim<1> ? ArrayLike4D<T> : never) :
                        R extends Rank.R6 ? (D extends ShapeMap[R] ? T : D extends Dim<5> ? ArrayLike1D<T> : D extends Dim<4> ? ArrayLike2D<T> : D extends Dim<3> ? ArrayLike3D<T> : D extends Dim<2> ? ArrayLike4D<T> : D extends Dim<1> ? ArrayLike5D<T> : never) :
                            never;

export type NdArrayOut<T, R extends Rank, D extends Dim<number>> =
    R extends Rank.R1 ? T :
        R extends Rank.R2 ? (D extends ShapeMap[R] ? T : D extends Dim<1> ? Array1D<T> : never) :
            R extends Rank.R3 ? (D extends ShapeMap[R] ? T : D extends Dim<2> ? Array1D<T> : D extends Dim<1> ? Array2D<T> : never) :
                R extends Rank.R4 ? (D extends ShapeMap[R] ? T : D extends Dim<3> ? Array1D<T> : D extends Dim<2> ? Array2D<T> : D extends Dim<1> ? Array3D<T> : never) :
                    R extends Rank.R5 ? (D extends ShapeMap[R] ? T : D extends Dim<4> ? Array1D<T> : D extends Dim<3> ? Array2D<T> : D extends Dim<2> ? Array3D<T> : D extends Dim<1> ? Array4D<T> : never) :
                        R extends Rank.R6 ? (D extends ShapeMap[R] ? T : D extends Dim<5> ? Array1D<T> : D extends Dim<4> ? Array2D<T> : D extends Dim<3> ? Array3D<T> : D extends Dim<2> ? Array4D<T> : D extends Dim<1> ? Array5D<T> : never) :
                            never;


