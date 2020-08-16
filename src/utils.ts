import { Ix, IxD } from './interface';

export function reduceAxes<D extends Ix>(axes: D, axis: number): IxD<D> {
    const ret = axes.slice() as IxD<D>;
    ret.splice(axis, 1);
    return ret;
}

export function iterAxes<D extends Ix>(axes: D, shape: D, axis: number) {
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
