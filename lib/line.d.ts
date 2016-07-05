import { Point } from './point';
export declare class Line {
    point1: Point;
    point2: Point;
    constructor(point1: Point, point2: Point);
    length(): number;
    intersect(line: Line): boolean;
}
