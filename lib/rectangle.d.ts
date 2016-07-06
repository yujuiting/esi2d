import { Point } from './point';
import { RelativeRectangle } from './relative-rectangle';
export declare class Rectangle {
    constructor(x?: number, y?: number, width?: number, height?: number);
    position: Point;
    width: number;
    height: number;
    getRelativeRectangle(anotherRectangle: Rectangle, validate?: boolean): RelativeRectangle;
    intersect(rectangle: Rectangle): boolean;
    containPoint(point: Point): boolean;
    containRectangle(anotherRectangle: Rectangle): boolean;
    isSame(rectangle: Rectangle): boolean;
    isZero(): boolean;
}
