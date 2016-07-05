/// <reference path="./typings.d.ts" />
import { Point } from './point';

describe('Esi2D.Point', function () {


  it('should contain x and y property', function () {
    var point = new Point();

    expect(point.x).toBeDefined();
    expect(point.y).toBeDefined();
  });


  describe('#translate', function () {


    it('should translate point to new coordinate', function () {
      var point = new Point(15, 20);
      var newOriginPoint = new Point(10, 10);

      point.translate(newOriginPoint);

      expect(point.x).toEqual(5);
      expect(point.y).toEqual(10);
    });


  });


});