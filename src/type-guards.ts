

export function isArrayLike<T = unknown>(a: unknown): a is T[] {
    return a instanceof Array ||
        a instanceof Float32Array || a instanceof Float64Array ||
        a instanceof Int32Array || a instanceof Uint32Array;
}
