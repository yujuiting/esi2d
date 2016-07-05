export class Point {
  constructor(public x: number = 0,
              public y: number = 0) {}

  length(): number {
    return Math.pow(Math.pow(this.x, 2) + Math.pow(this.y, 2), 0.5);
  }

  distanceTo(point: Point): number {
    return this.subtract(point).length();
  }
  
  translate(point: Point): void {
    let afterTranslate: Point = this.subtract(point);
    this.x = afterTranslate.x;
    this.y = afterTranslate.y;
  }

  add(point: Point): Point {
    return new Point(this.x + point.x, this.y + point.y);
  }

  subtract(point: Point): Point {
    return new Point(this.x - point.x, this.y - point.y);
  }

  sub(point: Point): Point {
    return this.subtract(point);
  }

  multiply(value: number): Point {
    return new Point(this.x * value, this.y * value);
  }

  mul(value: number): Point {
    return this.multiply(value);
  }

  isSame(point: Point): boolean {
    if (this.x !== point.x)
      return false;

    if (this.y !== point.y)
      return false;

    return true;
  }

  isZero(): boolean {
    return this.isSame(new Point());
  }

}