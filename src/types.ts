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

export interface FixedLengthArray<T, L extends number> extends Array<T> {
    length: L;
}

interface Dim<L extends number> extends Array<number> {
    0: number;
    length: L;
}

export type Ix1 = Dim<1>;
export type Ix2 = Dim<2>;
export type Ix3 = Dim<3>;
export type Ix4 = Dim<4>;
export type Ix5 = Dim<5>;
export type Ix6 = Dim<6>;
export type IxA = Ix1 | Ix2 | Ix3 | Ix4 | Ix5 | Ix6;

export type IxD<D extends (IxA | Rank)> =
    D extends Ix1 ? Ix1 :
        D extends Rank.R1 ? Ix1 :
            D extends Ix2 ? Ix2 | Ix1 :
                D extends Rank.R2 ? Ix2 | Ix1 :
                    D extends Ix3 ? Ix3 | Ix2 | Ix1 :
                        D extends Rank.R3 ? Ix3 | Ix2 | Ix1 :
                            D extends Ix4 ? Ix4 | Ix3 | Ix2 | Ix1 :
                                D extends Rank.R4 ? Ix4 | Ix3 | Ix2 | Ix1 :
                                    D extends Ix5 ? Ix5 | Ix4 | Ix3 | Ix2 | Ix1 :
                                        D extends Rank.R5 ? Ix5 | Ix4 | Ix3 | Ix2 | Ix1 :
                                            D extends Ix6 ? Ix6 | Ix5 | Ix4 | Ix3 | Ix2 | Ix1 :
                                                D extends Rank.R6 ? Ix6 | Ix5 | Ix4 | Ix3 | Ix2 | Ix1 :
                                                    never;

export type TypedArray = Float64Array | Float32Array | Int32Array | Uint32Array;

export type RegularArray<T> = T[] | T[][] | T[][][] | T[][][][] | T[][][][][] | T[][][][][][];


export enum Rank {
    // R0 = 'R0',
    R1 = 'R1',
    R2 = 'R2',
    R3 = 'R3',
    R4 = 'R4',
    R5 = 'R5',
    R6 = 'R6'
}

export interface ShapeMap {
    // R0: Dim<number>;
    R1: Ix1;
    R2: Ix2;
    R3: Ix3;
    R4: Ix4;
    R5: Ix5;
    R6: Ix6;
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

export type InferRank<D extends IxA> =
    D extends Ix1 ? Rank.R1 :
        D extends Ix2 ? Rank.R2 :
            D extends Ix3 ? Rank.R3 :
                D extends Ix4 ? Rank.R4 :
                    D extends Ix5 ? Rank.R5 :
                        D extends Ix6 ? Rank.R6 :
                            never;

export type InferIx<R extends Rank> =
    R extends Rank.R1 ? Ix1 :
        R extends Rank.R2 ? Ix2 :
            R extends Rank.R3 ? Ix3 :
                R extends Rank.R4 ? Ix4 :
                    R extends Rank.R5 ? Ix5 :
                        R extends Rank.R6 ? Ix5 :
                            never;

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

export type NdArrayIn<T, R extends Rank, D extends IxA> =
    R extends Rank.R1 ? T :
        R extends Rank.R2 ? (D extends ShapeMap[R] ? T : D extends Ix1 ? ArrayLike1D<T> : never) :
            R extends Rank.R3 ? (D extends ShapeMap[R] ? T : D extends Ix2 ? ArrayLike1D<T> : D extends Ix1 ? ArrayLike2D<T> : never) :
                R extends Rank.R4 ? (D extends ShapeMap[R] ? T : D extends Ix3 ? ArrayLike1D<T> : D extends Ix2 ? ArrayLike2D<T> : D extends Ix1 ? ArrayLike3D<T> : never) :
                    R extends Rank.R5 ? (D extends ShapeMap[R] ? T : D extends Ix4 ? ArrayLike1D<T> : D extends Ix3 ? ArrayLike2D<T> : D extends Ix2 ? ArrayLike3D<T> : D extends Ix1 ? ArrayLike4D<T> : never) :
                        R extends Rank.R6 ? (D extends ShapeMap[R] ? T : D extends Ix5 ? ArrayLike1D<T> : D extends Ix4 ? ArrayLike2D<T> : D extends Ix3 ? ArrayLike3D<T> : D extends Ix2 ? ArrayLike4D<T> : D extends Ix1 ? ArrayLike5D<T> : never) :
                            never;

export type NdArrayOut<T, R extends Rank, D extends IxA> =
    R extends Rank.R1 ? T :
        R extends Rank.R2 ? (D extends ShapeMap[R] ? T : D extends Ix1 ? Array1D<T> : never) :
            R extends Rank.R3 ? (D extends ShapeMap[R] ? T : D extends Ix2 ? Array1D<T> : D extends Ix1 ? Array2D<T> : never) :
                R extends Rank.R4 ? (D extends ShapeMap[R] ? T : D extends Ix3 ? Array1D<T> : D extends Ix2 ? Array2D<T> : D extends Ix1 ? Array3D<T> : never) :
                    R extends Rank.R5 ? (D extends ShapeMap[R] ? T : D extends Ix4 ? Array1D<T> : D extends Ix3 ? Array2D<T> : D extends Ix2 ? Array3D<T> : D extends Ix1 ? Array4D<T> : never) :
                        R extends Rank.R6 ? (D extends ShapeMap[R] ? T : D extends Ix5 ? Array1D<T> : D extends Ix4 ? Array2D<T> : D extends Ix3 ? Array3D<T> : D extends Ix2 ? Array4D<T> : D extends Ix1 ? Array5D<T> : never) :
                            never;
