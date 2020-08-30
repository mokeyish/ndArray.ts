import { Array2D } from '../types';
import { NdArray } from '../nd-array';

/**
 * Matrix product of two arrays.
 * @param a
 * @param b
 */
export function matMul(a: Array2D<number>, b: Array2D<number>): Array2D<number> {
    const aShape = a.shape;
    const bShape = b.shape;
    if (a.shape.length !== 2 || b.shape.length ! !== 2 || a.shape[1] !== b.shape[0]) {
        throw new Error(`matmul: Input operand 1 has a mismatch in its core dimension 0, with gufunc signature (n?,k),(k,m?)->(n?,m?) (size ${b.shape[0]} is different from ${a.shape[1]})`)
    }
    return NdArray.zeros([a.shape[0], b.shape[1]], a.dtype).map((_, [row, col]) => {
        const row1 = a.row(row);
        const col1 = b.col(col);
        let sum = 0;
        for (let i = 0; i < row1.length; i++) {
            sum += row1[i] * col1[i];
        }
        return sum;
    });
}



