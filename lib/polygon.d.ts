import { Rectangle } from './rectangle';
import { Point } from './point';
import { Line } from './line';
export declare class Polygon extends Rectangle {
    constructor();
    points: Point[];
    sides: Line[];
    translate(point: Point): void;
    addPoint(point: Point): boolean;
    removePoint(point: Point): boolean;
    indexOf(point: Point): number;
    containPoint(point: Point): boolean;
    private calculateBoundary();
    private calculateSides();
}
