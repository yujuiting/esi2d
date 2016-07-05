export declare class Point {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    length(): number;
    distanceTo(point: Point): number;
    translate(point: Point): void;
    add(point: Point): Point;
    subtract(point: Point): Point;
    sub(point: Point): Point;
    multiply(value: number): Point;
    mul(value: number): Point;
    isSame(point: Point): boolean;
    isZero(): boolean;
}
