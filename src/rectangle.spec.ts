/// <reference path="./typings.d.ts" />
import { Rectangle } from './rectangle';
import { Point } from './point';

describe('Esi2D.Rectangle', function () {


  it('should have position, width and height properties', function () {
    var rectangle = new Rectangle(0, 0, 10, 20);

    expect(rectangle.position).toBeDefined();
    expect(rectangle.width).toEqual(10);
    expect(rectangle.height).toEqual(20);
  });


  describe('#getRelativeBoundary', function () {


    beforeEach(function () {
      this.rectangle = new Rectangle(20, 10, 30, 40);
      this.container = new Rectangle(0, 0, 100, 100);
    });


    it('should return relative boundary', function () {
      var relativeBoundary = this.rectangle.getRelativeBoundary(this.container);

      expect(relativeBoundary.top).toEqual(0.1);
      expect(relativeBoundary.left).toEqual(0.2);
      expect(relativeBoundary.bottom).toEqual(0.5);
      expect(relativeBoundary.right).toEqual(0.5);
    });


    it('should resolve container problem', function () {
      var relativeBoundary = this.container.getRelativeBoundary(this.rectangle);

      expect(relativeBoundary.top).toEqual(0.1);
      expect(relativeBoundary.left).toEqual(0.2);
      expect(relativeBoundary.bottom).toEqual(0.5);
      expect(relativeBoundary.right).toEqual(0.5);
    });


  });


  describe('#containPoint', function () {


    it('should return true if rectangle contain a point', function () {
      var rectangle = new Rectangle(0, 0, 100, 100);
      var pointInside = new Point(20, 20);
      var pointOutside = new Point(-10, 120);

      expect(rectangle.containPoint(pointInside)).toBeTruthy();
      expect(rectangle.containPoint(pointOutside)).toBeFalsy();
    });


  });


  describe('#containRectangle', function () {


    it('should return true if rectangle contain anothors', function () {
      var rectangle = new Rectangle(20, 10, 100, 100);
      var anotherInside = new Rectangle(20, 10, 50, 50);
      var anotherOutside = new Rectangle(0, 0, 100, 100);

      expect(rectangle.containRectangle(anotherInside)).toBeTruthy();
      expect(rectangle.containRectangle(anotherOutside)).toBeFalsy();
    });


  });


});