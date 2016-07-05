import { Point } from './point';
import { RelativeRectangle } from './relative-rectangle';
import { setPrecision } from './utilities';

export class Rectangle {
  
  constructor(x: number = 0,
              y: number = 0,
              width: number = 0,
              height: number = 0) {
    
    this.position = new Point(x, y);
    this.width = width;
    this.height = height;
  }

  position: Point;

  width: number;

  height: number;
  
  getRelativeBoundary(anotherRectangle: Rectangle, validate: boolean = true): RelativeRectangle {
    let containerRectangle: Rectangle = anotherRectangle;
    let relativeRectangle: Rectangle = this;

    if (validate && relativeRectangle.containRectangle(containerRectangle)) {
      containerRectangle = this;
      relativeRectangle = anotherRectangle;
    }
    
    return new RelativeRectangle(
      relativeRectangle.position.y / containerRectangle.height,
      relativeRectangle.position.x / containerRectangle.width,
      (relativeRectangle.position.y + relativeRectangle.height) / containerRectangle.height,
      (relativeRectangle.position.x + relativeRectangle.width) / containerRectangle.width,
      validate);
  }

  intersect(rectangle: Rectangle): boolean {
    // TODO: calculate rectangle intersection
    return false;
  }

  containPoint(point: Point): boolean {
    if (point.x < this.position.x) {
      return false;
    }

    if (point.y < this.position.y) {
      return false;
    }

    if (point.x > this.position.x + this.width) {
      return false;
    }

    if (point.y > this.position.y + this.height) {
      return false;
    }

    return true;
  }

  containRectangle(anotherRectangle: Rectangle): boolean {
    if (this.position.x > anotherRectangle.position.x) {
      return false;
    }

    if (this.position.y > anotherRectangle.position.y) {
      return false;
    }

    if (this.width < anotherRectangle.width) {
      return false;
    }

    if (this.height < anotherRectangle.height) {
      return false;
    }

    return true;
  }

  isSame(rectangle: Rectangle): boolean {
    if (!this.position.isSame(rectangle.position))
      return false;

    if (this.width !== rectangle.width)
      return false;

    if (this.height !== rectangle.height)
      return false;

    return true;
  }

  isZero(): boolean {
    if (!this.position.isZero())
      return false;

    if (this.width !== 0)
      return false;

    if (this.height !== 0)
      return false;

    return true;
  }

}