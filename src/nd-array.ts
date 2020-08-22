import '@tszone/ext';
import {
    Array1D,
    Array2D,
    Array3D,
    Array4D,
    Array5D,
    Array6D,
    ArrayMap,
    DataType,
    Dim,
    NdArrayIn,
    NdArrayOut,
    Rank, RankDown,
    InferRank,
    ShapeMap
} from './types';
import { isArrayLike } from './type-guards';
import {
    castAxesToIndex,
    changeType,
    flattenArray,
    getArrayShape,
    castIndexToAxes,
    shapeArray,
    validateAxesRange
} from './utils';
import { NdIter } from './nd-iter';
import * as ops from '../src/ops';

// noinspection DuplicatedCode
export class NdArray<T, R extends Rank = Rank> implements NdArray<T, R> {
    private readonly _radix: ShapeMap[R];
    private readonly _shape: ShapeMap[R];
    private readonly _data: T[];
    constructor(data: T[], shape: ShapeMap[R], public readonly dtype: DataType) {
        if (data.length !== shape.prod()) {
            throw new Error('invalid data length and shape');
        }
        const radix = Array<number>(shape.length) as ShapeMap[R];
        let p = data.length;
        for (let i = 0; i < shape.length; i++) {
            radix[i] = p = p / shape[i];
        }
        this._radix = radix;
        this._shape = shape;
        this._data = data as T[];
    }

    public static fromArray<T>(data: ArrayMap<T>[Rank.R6], dtype?: DataType): Array6D<T>;
    public static fromArray<T>(data: ArrayMap<T>[Rank.R5], dtype?: DataType): Array5D<T>;
    public static fromArray<T>(data: ArrayMap<T>[Rank.R4], dtype?: DataType): Array4D<T>;
    public static fromArray<T>(data: ArrayMap<T>[Rank.R3], dtype?: DataType): Array3D<T>;
    public static fromArray<T>(data: ArrayMap<T>[Rank.R2], dtype?: DataType): Array2D<T>;
    public static fromArray<T>(data: ArrayMap<T>[Rank.R1], dtype?: DataType): Array1D<T>;
    public static fromArray<T, D extends Dim<number>>(data: T[], shape: D, dtype?: DataType): NdArray<T, InferRank<D>>;
    public static fromArray<T, R extends Rank>(data: T[], shape: ShapeMap[R], dtype?: DataType): NdArray<T, R>;
    public static fromArray<T, D extends Dim<number>>(a: T[] | ArrayMap<T>[InferRank<D>], b?: D | DataType, dtype: DataType = 'generic'): NdArray<T, InferRank<D>> {
        if (b instanceof Array) {
            if (isArrayLike<T>(a)) {
                const data = changeType(a, dtype);
                const shape = b as unknown as ShapeMap[InferRank<D>];
                return new NdArray<T, InferRank<D>>(data, shape, dtype);
            } else {
                throw new Error('unimplemented');
            }
        } else if (isArrayLike(a)) {
            dtype = b ?? 'generic';
            const data = changeType(flattenArray<T>(a), dtype);
            const shape = getArrayShape(a) as ShapeMap[InferRank<D>];
            return new NdArray<T, InferRank<D>>(data, shape, dtype);
        } else {
            throw new Error('unimplemented');
        }
    }

    public static fill<T, D extends Dim<number>>(shape: D, val: T, dtype: DataType = 'generic'): NdArray<number, InferRank<D>> {
        const len = shape.prod();
        const data = Array(len).fill(val);
        return NdArray.fromArray(data, shape, dtype);
    }
    public static full<T, D extends Dim<number>>(shape: D, val: T, dtype: DataType = 'generic'): NdArray<number, InferRank<D>> {
        return NdArray.fill(shape, val, dtype);
    }
    public static eye<N extends number, M extends (number | N) = N>(n: N, m?: M, k: number = 0, dtype: DataType = 'float64'): Array2D<number> {
        m = m ?? n as M;
        const shape: [N, M] = [n, m];
        const len = shape.prod();
        const data = NdArray.fromArray<number, Dim<2>>(Array<number>(len).fill(0), [n, m], dtype);
        const max = Math.min(n, m);
        for (let i = 0; i < max; i++) {
            const x = i + k;
            const y = i;
            if (x > m - 1) {
                break;
            }
            data.set([y, x], 1.0);
        }
        return data;
    }
    public static ones<D extends Dim<number>>(shape: D, dtype: DataType = 'float64'): NdArray<number, InferRank<D>> {
        return NdArray.fill(shape, 1., dtype);
    }
    public static zeros<D extends Dim<number>>(shape: D, dtype: DataType = 'float64'): NdArray<number, InferRank<D>> {
        return NdArray.fill(shape, 0., dtype);
    }

    public static range(start: number, end?: number, step?: number, dtype: DataType = 'float64'): Array1D<number> {
        return NdArray.fromArray(Array.range(start, end!, step!), dtype);
    }

    public get data(): ReadonlyArray<T> {
        return this._data;
    }
    public get shape(): ShapeMap[R] {
        return this._shape;
    }
    public get radix(): ShapeMap[R] {
        return this._radix;
    }
    public get rank(): number {
        return this._shape.length;
    }
    public get length(): number {
        return this._data.length;
    }

    public get(...axes: ShapeMap[R]): T;
    public get<D extends Dim<number>>(...axes: D): NdArrayOut<T, R, D>;
    public get<D extends Dim<number>>(...axes: D): unknown {
        if (!validateAxesRange(axes, this._shape)) {
            throw Error('index out of range.');
        }
        let nd: unknown | unknown[] = this.ndArray();
        for (const i of axes) {
            if (nd instanceof Array) {
                nd = nd[i];
            } else {
                break;
            }
        }
        if (nd instanceof Array) {
            return NdArray.fromArray(nd);
        }
        return nd;
    }

    public set(axes: ShapeMap[R], val: T): void;
    public set<D extends Dim<number>>(axes: D, val: NdArrayIn<T, R, D>): void
    public set<D extends Dim<number>>(axes: D | ShapeMap[R], val: NdArrayIn<T, R, D> | T): void {
        const index = castAxesToIndex(axes, this._radix);
        if (val instanceof Array) {
            const data = flattenArray<T>(val);
            for (let i = 0; i < data.length; i++) {
                this._data[i + index] = data[i];
            }
        } else {
            this._data[index] = val;
        }
    }

    public map<U>(callbackfn: (value: T, axes: ShapeMap[R], index: number, ndArray: this) => U, dtype: DataType = 'generic'): NdArray<U, R> {
        const data: U[] = Array(this.length);
        const shape = this._shape;
        for (let i = 0; i < data.length; i++) {
            const val = this._data[i];
            const axes = castIndexToAxes(i, shape);
            data[i] = callbackfn(val, axes, i, this);
        }
        return NdArray.fromArray(data, shape, dtype) as unknown as NdArray<U, R>;
    }

    public clone(): NdArray<T, R> {
        return new NdArray(this._data.slice(), this._shape, this.dtype);
    }

    public reshape<U extends Dim<number>>(shape: U): NdArray<T, InferRank<U>> {
        Object.assign(this, new NdArray(this._data, shape, this.dtype));
        return this as unknown as NdArray<T, InferRank<U>>;
    }
    public flatten(): Array1D<T> {
        return this.clone().reshape([this.length]);
    }

    public ndArray(): ArrayMap<T>[R] {
        return shapeArray(this._data, this._radix);
    }

    public iter(): NdIter<T, R> {
        return new NdIter<T, R>(this);
    }

    public col(this: NdArray<T, Rank.R2>, colIndex: number): T[] {
        const rowSize = this.shape[0];
        const data = Array(rowSize);
        for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
            data[rowIndex] = this.get(rowIndex, colIndex);
        }
        return data;
    }

    public row(this: NdArray<T, Rank.R2>, rowIndex: number): T[] {
        const colSize = this.shape[1];
        const data = Array(colSize);
        for (let colIndex = 0; colIndex < data.length; colIndex++) {
            data[colIndex] = this.get(rowIndex, colIndex);
        }
        return data;
    }

    // #region [ops]
    public all(this: NdArray<number | boolean, R>): boolean;
    public all(this: NdArray<number | boolean, R>, axis: number): NdArray<boolean, RankDown[R]>;
    public all(this: NdArray<number | boolean, R>, axis?: number): NdArray<boolean, RankDown[R]> | boolean {
        return ops.all(this, axis);
    }
    public argmax(this: NdArray<number, R>): number;
    public argmax(this: NdArray<number, R>, axis: number): NdArray<number, RankDown[R]>;
    public argmax(this: NdArray<number, R>, axis?: number): NdArray<number, RankDown[R]> | number {
        return ops.argmax(this, axis);
    }

    public sum(this: NdArray<number, R>): number;
    public sum(this: NdArray<number, R>, axis: number): NdArray<number, RankDown[R]>;
    public sum(this: NdArray<number, R>, axis?: number): NdArray<number, RankDown[R]> | number {
        return ops.sum(this, axis);
    }

    public cumsum(this: NdArray<number, R>): Array1D<number>;
    public cumsum(this: NdArray<number, R>, axis: number): NdArray<number, R>;
    public cumsum(this: NdArray<number, R>, axis?: number): NdArray<number, R> | Array1D<number> {
        return ops.cumsum(this, axis);
    }

    public neg(this: NdArray<number, R>): NdArray<number, R> {
        return ops.neg(this);
    }
    public add(this: NdArray<number, R>, x: NdArray<number, R> | number): NdArray<number, R> {
        return ops.add(this, x);
    }
    public sub(this: NdArray<number, R>, x: NdArray<number, R> | number): NdArray<number, R> {
        return ops.sub(this, x);
    }
    public mul(this: NdArray<number, R>, x: NdArray<number, R> | number): NdArray<number, R> {
        return ops.mul(this, x);
    }

    public div(this: NdArray<number, R>, x: NdArray<number, R> | number): NdArray<number, R> {
        return ops.div(this, x);
    }
    public addAssign(this: NdArray<number, R>, x: NdArray<number, R> | number): void {
        ops.addAssign(this, x);
    }
    public subAssign(this: NdArray<number, R>, x: NdArray<number, R> | number): void {
        ops.subAssign(this, x);
    }
    public mulAssign(this: NdArray<number, R>, x: NdArray<number, R> | number): void {
        ops.mulAssign(this, x);
    }
    public divAssign(this: NdArray<number, R>, x: NdArray<number, R> | number): void {
        ops.divAssign(this, x);
    }

    public matmul(this: NdArray<number, Rank.R2>, x: NdArray<number, Rank.R2>): NdArray<number, Rank.R2> {
        throw new Error('');
    }
    // endregion
}


