import { Rectangle } from './rectangle';
import { Point } from './point';
import { Line } from './line';

export class Polygon extends Rectangle {
  constructor() {
    super();
  }

  points: Point[] = [];

  sides: Line[] = [];

  translate(point: Point): void {
    for (let i: number = 0; i < this.points.length; i++) {
      this.points[i].translate(point);
    }
    this.calculateBoundary();
  }

  addPoint(point: Point): boolean {
    if (this.indexOf(point) !== -1) {
      return false;
    }

    this.points.push(point);

    this.calculateBoundary();

    this.calculateSides();

    return true;
  }

  removePoint(point: Point): boolean {
    let index: number = this.indexOf(point);
    if (index === -1) {
      return false;
    }

    this.points = this.points.splice(index, 1);

    this.calculateBoundary();

    this.calculateSides();

    return true;
  }

  indexOf(point: Point): number {
    return this.points.indexOf(point);
  }

  containPoint(point: Point): boolean {
    if (!Rectangle.prototype.containPoint.call(this, point))
      return false;

    let pointOutside: Point = new Point(-1, -1);

    let rayLine: Line = new Line(pointOutside, point);

    let line: Line;
    let collideCount: number = 0;

    for (let i = 0; i < this.sides.length; i++) {
      line = this.sides[i];
      if (line.intersect(rayLine))
        collideCount++;
    }

    if (collideCount % 2 === 0) {
      return false;
    }

    return true;
}

  private calculateBoundary() {
    let point: Point = this.points[0];
    let minX: number = point.x;
    let maxX: number = point.x;
    let minY: number = point.y;
    let maxY: number = point.y;

    for (let i = 1; i < this.points.length; i++) {
      point = this.points[i];

      if (point.x < minX) {
        minX = point.x;
      } else if (point.x > maxX) {
        maxX = point.x;
      }

      if (point.y < minY) {
        minY = point.y;
      } else if (point.y > maxY) {
        maxY = point.y;
      }
    }

    this.position.x = minX;
    this.position.y = minY;
    this.width = maxX - minX;
    this.height = maxY - minY;
  }

  private calculateSides () {
    if (this.points.length < 2)
      return;

    this.sides = [];

    for (let i: number = 0; i < this.points.length - 1; i++) {
      for (let j: number = i + 1; j < this.points.length; j++) {
        this.sides.push(new Line(this.points[i], this.points[j]));
      }
    }
  }

}