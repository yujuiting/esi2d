/// <reference path="./typings.d.ts" />
import { Point } from './point';
import { Line } from './line';

describe('Esi2D.Line', function () {

  var line;

  beforeEach(function () {
    var p1 = new Point(10, 0);
    var p2 = new Point(10, 10);
    line = new Line(p1, p2);
  });

  it('should have 2 points', function () {
    expect(line.point1).toBeDefined();
    expect(line.point2).toBeDefined();
  });


  describe('#length', function () {

    it('should return length of line', function () {
      expect(line.length()).toEqual(10);
    });
    
  });


  describe('#intersect', function () {

    it('should be truthy if intersect', function () {
      var lineIntersected = new Line(
        new Point(5, 5),
        new Point(15, 5));

      expect(line.intersect(lineIntersected)).toBeTruthy();
    });

    it('should be falsy if no intersect', function () {
      var lineNotIntersected = new Line(
        new Point(9, 10),
        new Point(5, 0));

      expect(line.intersect(lineNotIntersected)).toBeFalsy();
    });

  });


});