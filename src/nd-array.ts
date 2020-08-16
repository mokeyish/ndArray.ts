import '@tszone/ext';
import { changeType } from './type';
import * as ops from './ops';
import {
    Array1D,
    Array2D,
    Array3D, Array4D, Array5D, Array6D,
    DataType,
    INdArray,
    INdArrayGeneric,
    Ix, IxD,
    Ix1,
    Ix2,
    Ix3,
    Ix4,
    Ix5,
    Ix6, MultiDimensionArray, INumericNdArray
} from './interface';


export class NdArray<T = any, D extends Ix = Ix> implements INdArrayGeneric<T, D> {
    private readonly _radix: D;
    private readonly _shape: D;
    private readonly _data: T[];

    private constructor(data: T[],  shape: D, public readonly dtype: DataType) {
        if (data.length !== shape.reduce((p1, c1) => p1 * c1)) {
            throw new Error('invalid data length and shape');
        }
        const radix = Array<number>(shape.length) as D;
        let p = data.length;
        for (let i = 0; i < shape.length; i++) {
            radix[i] = p = p / shape[i];
        }
        this._radix = radix;
        this._shape = shape;
        this._data = data as T[];
    }

    public static fromArray<T, D extends Ix = Ix1>(data: T[], shape: D, dtype: DataType = 'generic'): INdArray<T, D> {
        data = changeType(data, dtype);
        return (new NdArray<T, D>(data, shape, dtype) as unknown) as INdArray<T, D>;
    }

    public static array1d<T>(data: T[], shape?: Ix1, dtype: DataType = 'generic'): Array1D<T> {
        shape = [data.length];
        return NdArray.fromArray(data, shape, dtype);
    }
    public static array2d<T>(data: T[], shape: Ix2, dtype: DataType = 'generic'): Array2D<T> {
        return NdArray.fromArray(data, shape, dtype);
    }
    public static array3d<T>(data: T[], shape: Ix3, dtype: DataType = 'generic'): Array3D<T> {
        return NdArray.fromArray(data, shape, dtype);
    }
    public static array4d<T>(data: T[], shape: Ix4, dtype: DataType = 'generic'): Array4D<T> {
        return NdArray.fromArray(data, shape, dtype);
    }
    public static array5d<T>(data: T[], shape: Ix5, dtype: DataType = 'generic'): Array5D<T> {
        return NdArray.fromArray(data, shape, dtype);
    }
    public static array6d<T>(data: T[], shape: Ix6, dtype: DataType = 'generic'): Array6D<T> {
        return NdArray.fromArray(data, shape, dtype);
    }

    public static ones<D extends Ix>(shape: D): INdArray<number, D> {
        return NdArray.fill(shape, 1);
    }

    public static zeros<D extends Ix>(shape: D): INdArray<number, D> {
        return NdArray.fill(shape, 0);
    }

    public static fill<T, D extends Ix>(shape: D, value: T, dtype: DataType = 'generic'): INdArray<T, D> {
        const len = shape.reduce((p, c) => p * c);
        const data = Array(len).fill(value);
        return NdArray.fromArray<T, D>(data, shape, dtype);
    }
    public static full<T, D extends Ix>(shape: D, value: T, dtype: DataType = 'generic'): INdArray<T, D> {
        return NdArray.fill(shape, value, dtype);
    }

    public get data(): T[] {
        return this._data;
    }

    public get shape(): D {
        return this._shape.slice() as D;
    }

    public get length(): number {
        return this.data.length;
    }

    public get rank(): number {
        return this._shape.length;
    }

    public get(...axes: D): T {
        return this.data[this.castAxesToIndex(axes)] as T;
    }

    public set(axes: D, val: T): void {
        this._data[this.castAxesToIndex(axes)] = val;
    }

    public ndArray(): MultiDimensionArray<T, D> {
        function f(data: T[], radix: number[]): any {
            const d = [];
            const count = radix[0];
            const len = data.length / count;
            const nextRadix = radix.length > 1 ? radix.slice(1, radix.length) : undefined;
            for (let i = 0; i < len; i++) {
                const c = data.slice(i * count, (i + 1) * count);
                if (nextRadix) {
                    d.push(f(c, nextRadix));
                } else {
                    d.push(...c);
                }
            }
            return d;
        }

        return f(this._data, this._radix);
    }

    public reshape<Shape extends Ix = Ix1>(shape: Shape): NdArray<T, Shape> {
        return new NdArray(this._data, shape, this.dtype);
    }

    public clone(): INdArray<T, D> {
        return new NdArray(this._data.slice(), this._shape, this.dtype) as unknown as INdArray<T, D>;
    }

    public map<U>(callbackfn: (value: T, axes: D, ndArray: INdArray<T, D>) => U, dtype: DataType = 'generic'): INdArray<U, D> {
        const data: U[] = Array(this.data.length);
        for (let i = 0; i < this.data.length; i++) {
            const val = this.data[i] as T;
            const axes: D = this.castIndexToAxes(i);
            data[i] = callbackfn(val, axes, this as unknown as INdArray<T, D>);
        }
        return NdArray.fromArray<U, D>(data, this.shape, dtype);
    }




    public checkAxes(axes: D): boolean {
        if (axes.length !== this._shape.length) {
            throw new Error();
        }
        for (let i = 0; i < this._shape.length; i++) {
            const a = axes[i];
            if (a < 0 || a >= this._shape[i]) {
                return false;
            }
        }
        return true;
    }
    public index(...axes: D): number {
        return this.castAxesToIndex(axes);
    }

    public axes(index: number): D {
        return this.castIndexToAxes(index);
    }

    // region [numeric opts]
    all(): boolean;
    all(axis: number): INdArray<boolean, IxD<D>>;
    all(axis?: number): boolean | INdArray<boolean, IxD<D>> {
        return ops.all<T, D>(this as unknown as INdArray<T, D>, axis);
    }

    private sum(axis?: number): number | INumericNdArray<IxD<D>> {
        return ops.sum<D>(this as unknown as INumericNdArray<D>, axis);
    }

    private neg(): INdArray<number, D> {
        return ops.neg(this as unknown as INdArray<number, D>);
    }
    // endregion


    public toString(): string {
        const buffer: string[] = [];
        function f(data: object, depth: number = 1): void {
            if (!(data instanceof Array)) {
                return;
            }
            buffer.push('[');
            for (let i = 0; i < data.length; i++) {
                const val = data[i];
                const isArray = Array.isArray(val);

                if (isArray) {
                    if (i !== 0) {
                        buffer.push(...Array<string>(depth).fill(' '));
                    }
                    f(val, depth + 1);
                    if (i !== data.length - 1) {
                        buffer.push('\n');
                    }
                } else {
                    if (i !== 0) {
                        buffer.push(' ');
                    }
                    buffer.push(val.toString());
                }
            }
            buffer.push(']');
        }
        f(this.ndArray());
        return buffer.join('');
    }


    private castAxesToIndex(axes: D): number {
        if (!this.checkAxes(axes)) {
            throw new Error();
        }
        let index = 0;
        for (let i = 0; i < this._radix.length; i++) {
            index += axes[i] * this._radix[i];
        }
        return index;
    }

    private castIndexToAxes(index: number): D {
        if (index < 0 || index >= this._data.length) {
            throw new Error();
        }
        const shape = this._shape;
        let x = shape.reduce((p, c) => p * c);
        return shape.map((v, i) => {
            if (i === shape.length - 1) {
                return index;
            }
            x = x / shape[i];
            const a = Math.floor(index / x);
            index = index % x;
            return a;
        }) as D;
    }
}
