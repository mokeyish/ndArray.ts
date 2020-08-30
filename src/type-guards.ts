import { Ix1, Ix2, Ix3, Ix4, Ix5, Ix6 } from './types';

export function isArrayLike<T = unknown>(a: unknown): a is T[] {
    return a instanceof Array ||
        a instanceof Float32Array || a instanceof Float64Array ||
        a instanceof Int32Array || a instanceof Uint32Array;
}

export function isIx1(x: unknown): x is Ix1 {
    return x instanceof Array && x.length === 1;
}

export function isIx2(x: unknown): x is Ix2 {
    return x instanceof Array && x.length === 2;
}

export function isIx3(x: unknown): x is Ix3 {
    return x instanceof Array && x.length === 3;
}

export function isIx4(x: unknown): x is Ix4 {
    return x instanceof Array && x.length === 4;
}

export function isIx5(x: unknown): x is Ix5 {
    return x instanceof Array && x.length === 5;
}

export function isIx(x: unknown): x is Ix6 {
    return x instanceof Array && x.length === 6;
}
