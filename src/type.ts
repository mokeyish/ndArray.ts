import { DataType } from './interface';

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

