export const int8 = 'int8';
export const uint8 = 'uint8';
export const int16 = 'int16';
export const uint16 = 'uint16';
export const int32 = 'int32';
export const uint32 = 'uint32';
export const float32 = 'float32';
export const float64 = 'float64';

export type DataType = 'int8' | 'uint8' | 'int16' | 'uint16' | 'int32' | 'uint32' | 'float32' | 'float64' | 'generic';

// type TypedArray<T> = Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | T[];


export interface Ix<L extends number = number> extends Array<number> {
    0: number;
    length: L;
}

export type Ix1 = Ix<1>;
export type Ix2 = Ix<2>;
export type Ix3 = Ix<3>;
export type Ix4 = Ix<4>;
export type Ix5 = Ix<5>;
export type Ix6 = Ix<6>;

export type IxD<D extends Ix> =
    D extends Ix1 ? never :
        D extends Ix2 ? Ix1 :
            D extends Ix3 ? Ix2 :
                D extends Ix4 ? Ix3 :
                    D extends Ix5 ? Ix4 :
                        D extends Ix6 ? Ix5 :
                            never;

export type MultiDimensionArray<T, D extends Ix> =
    D extends Ix1 ? T[] :
        D extends Ix2 ? T[][] :
            D extends Ix3 ? T[][][] :
                D extends Ix4 ? T[][][][] :
                    D extends Ix5 ? T[][][][][] :
                        D extends Ix6 ? T[][][][][][] :
                            never;


export interface INdArrayGeneric<T, D extends Ix> {
    readonly data: T[];
    readonly dtype: DataType;
    readonly shape: D;
    readonly rank: number;

    index(...axes: D): number;

    axes(index: number): D;

    ndArray(): MultiDimensionArray<T, D>;

    clone(): INdArray<T, D>;

    get(...axes: D): T;

    set(axes: D, val: T): void;

    map<U>(callbackfn: (value: T, axes: D, ndArray: INdArray<T, D>) => U, dtype?: DataType): INdArray<U, D>;

    all(): boolean;

    all(axis: number): INdArray<boolean, IxD<D>>;
}

export interface INumericNdArray<D extends Ix> extends INdArrayGeneric<number, D> {
    sum(): number;

    sum(axis: number): INumericNdArray<IxD<D>>;

    neg(): INumericNdArray<D>;
}


export type INdArray<T = any, D extends Ix = Ix> =
    T extends number ? INumericNdArray<D> :
        T extends boolean ? INdArrayGeneric<boolean, D> :
            INdArrayGeneric<T, D>;


export type Array1D<T> = INdArray<T, Ix1>;
export type Array2D<T> = INdArray<T, Ix2>;
export type Array3D<T> = INdArray<T, Ix3>;
export type Array4D<T> = INdArray<T, Ix4>;
export type Array5D<T> = INdArray<T, Ix5>;
export type Array6D<T> = INdArray<T, Ix6>;
