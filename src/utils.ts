import { isArrayLike } from './type-guards';
import { ArrayMap, DataType, Dim, Rank, RankDown, ShapeMap } from './types';

export function reduceAxes<R extends Rank>(axes: ShapeMap[R], axis: number): ShapeMap[RankDown[R]] {
    const ret = axes.slice() as ShapeMap[RankDown[R]];
    ret.splice(axis, 1);
    return ret;
}

export function iterAxes<D extends Dim<number>>(axes: D, shape: D, axis?: number): D | undefined {
    for (let i = 0; i < shape.length; i++) {
        if (i === axis) {
            continue;
        }
        if (axes[i] < shape[i] - 1) {
            return axes.map((v, n) => n === i ? v + 1 : v) as D;
        }
        axes[i] = 0;
    }
}

export function validateAxesRange(axes: number[], shape: number[]): boolean {
    for (let i = 0; i < axes.length; i++) {
        const a = axes[i];
        if (a < 0 || a >= shape[i]) {
            return false;
        }
    }
    return true;
}

export function castAxesToIndex<D extends number[]>(axes: D, radix: D): number {
    let index = 0;
    for (let i = 0; i < axes.length; i++) {
        index += axes[i] * radix[i];
    }
    return index;
}

export function castIndexToAxes<R extends Rank>(index: number, shape: ShapeMap[R]): ShapeMap[R] {
    let x = shape.reduce((p, c) => p * c);
    if (index < 0 || index >= x) {
        throw new Error();
    }
    return shape.map((v, i) => {
        if (i === shape.length - 1) {
            return index;
        }
        x = x / shape[i];
        const a = Math.floor(index / x);
        index = index % x;
        return a;
    }) as ShapeMap[R];
}

export function getArrayShape(data: unknown[]): ShapeMap[Rank.R0] {
    const shape: ShapeMap[Rank.R0] = [data.length];
    function f(d: unknown) {
        if (isArrayLike(d)) {
            shape.push(d.length);
            f(d[0]);
        }
    }
    f(data[0]);
    return shape;
}

export function flattenArray<T>(data: unknown[]): T[] {
    const ret: T[] = [];
    function f(d: unknown[]) {
        for (const v of d) {
            if (isArrayLike(v)) {
                f(v);
            } else {
                ret.push(v as T);
            }
        }
    }
    f(data);
    return ret;
}

export function shapeArray<T, R extends Rank>(data: T[], radix: ShapeMap[R]): ArrayMap<T>[R] {
    function f(array: T[], midRadix: number[]): unknown[] {
        const d = [];
        const count = midRadix[0];
        const len = array.length / count;
        const nextRadix = midRadix.length > 1 ? midRadix.slice(1, midRadix.length) : undefined;
        for (let i = 0; i < len; i++) {
            const c = array.slice(i * count, (i + 1) * count);
            if (nextRadix) {
                d.push(f(c, nextRadix))
            } else {
                d.push(...c);
            }
        }
        return d;
    }
    return f(data, radix) as ArrayMap<T>[R];
}

export function changeType<T>(data: T[], dtype: DataType = 'generic'): T[] {
    switch (dtype) {
        case 'int8':
            return new Int8Array(data as Iterable<number>) as unknown as T[];
        case 'uint8':
            return new Uint8Array(data as Iterable<number>) as unknown as T[];
        case 'int16':
            return new Int16Array(data as Iterable<number>) as unknown as T[];
        case 'uint16':
            return new Uint16Array(data as Iterable<number>) as unknown as T[];
        case 'int32':
            return new Int32Array(data as Iterable<number>) as unknown as T[];
        case 'uint32':
            return new Uint32Array(data as Iterable<number>) as unknown as T[];
        case 'float32':
            return new Float32Array(data as Iterable<number>) as unknown as T[];
        case 'float64':
            return new Float64Array(data as Iterable<number>) as unknown as T[];
        case 'generic':
            return data;
        default:
            throw new Error('Unexpected data type.');
    }
}
