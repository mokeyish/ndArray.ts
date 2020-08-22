import { indexToAxes } from './utils';
import { Rank, ShapeMap } from './types';
import { NdArray } from './nd-array';

export class NdIter<T, R extends Rank> {
    private _index: number = -1;
    public get index(): number {
        return this._index;
    }
    public get axesIndex(): ShapeMap[R] {
        if (this._index === -1) {
            throw new Error('please run iter.moveNext() first.');
        }
        return indexToAxes(this._index, this.ndArray.shape);
    }
    public get current(): T {
        if (this._index === -1) {
            throw new Error('please run iter.moveNext() first.');
        }
        return this.ndArray.data[this._index];
    }
    constructor(public readonly ndArray: NdArray<T, R>) { }
    public reset(): void {
        this._index = -1;
    }
    public moveNext(): boolean {
        if (this._index < this.ndArray.data.length - 1) {
            this._index ++;
            return true;
        }
        return false;
    }
}
