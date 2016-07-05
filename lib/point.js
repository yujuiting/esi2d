"use strict";
var Point = (function () {
    function Point(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Point.prototype.length = function () {
        return Math.pow(Math.pow(this.x, 2) + Math.pow(this.y, 2), 0.5);
    };
    Point.prototype.distanceTo = function (point) {
        return this.subtract(point).length();
    };
    Point.prototype.translate = function (point) {
        var afterTranslate = this.subtract(point);
        this.x = afterTranslate.x;
        this.y = afterTranslate.y;
    };
    Point.prototype.add = function (point) {
        return new Point(this.x + point.x, this.y + point.y);
    };
    Point.prototype.subtract = function (point) {
        return new Point(this.x - point.x, this.y - point.y);
    };
    Point.prototype.sub = function (point) {
        return this.subtract(point);
    };
    Point.prototype.multiply = function (value) {
        return new Point(this.x * value, this.y * value);
    };
    Point.prototype.mul = function (value) {
        return this.multiply(value);
    };
    Point.prototype.isSame = function (point) {
        if (this.x !== point.x)
            return false;
        if (this.y !== point.y)
            return false;
        return true;
    };
    Point.prototype.isZero = function () {
        return this.isSame(new Point());
    };
    return Point;
}());
exports.Point = Point;
//# sourceMappingURL=/point.js.map