"use strict";
var Line = (function () {
    function Line(point1, point2) {
        this.point1 = point1;
        this.point2 = point2;
    }
    Line.prototype.length = function () {
        return this.point1.distanceTo(this.point2);
    };
    Line.prototype.intersect = function (line) {
        // http://stackoverflow.com/questions/217578/how-can-i-determine-whether-a-2d-point-is-within-a-polygon
        // aX + bY + c = 0
        // Get linear equation for this line
        var a1, b1, c1, a2, b2, c2, d1, d2;
        a1 = this.point2.y - this.point1.y;
        b1 = this.point1.x - this.point2.x;
        c1 = this.point2.x * this.point1.y - this.point1.x * this.point2.y;
        d1 = a1 * line.point1.x + b1 * line.point1.y + c1;
        d2 = a1 * line.point2.x + b1 * line.point2.y + c1;
        // determine the 2 points of anthoer line are at same side
        if (d1 > 0 && d2 > 0 ||
            d1 < 0 && d2 < 0) {
            return false;
        }
        a2 = line.point2.y - line.point1.y;
        b2 = line.point1.x - line.point2.x;
        c2 = line.point2.x * line.point1.y - line.point1.x * line.point2.y;
        d1 = a2 * this.point1.x + b2 * this.point1.y + c2;
        d2 = a2 * this.point2.x + b2 * this.point2.y + c2;
        if (d1 > 0 && d2 > 0 ||
            d1 < 0 && d2 < 0) {
            return false;
        }
        // collinear
        // if (parseInt(a1 * b2 - a2 * b1) == 0)
        //   return true;
        return true;
    };
    return Line;
}());
exports.Line = Line;
//# sourceMappingURL=/line.js.map