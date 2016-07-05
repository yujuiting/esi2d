"use strict";
var point_1 = require('./point');
var relative_rectangle_1 = require('./relative-rectangle');
var Rectangle = (function () {
    function Rectangle(x, y, width, height) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        this.position = new point_1.Point(x, y);
        this.width = width;
        this.height = height;
    }
    Rectangle.prototype.getRelativeBoundary = function (anotherRectangle, validate) {
        if (validate === void 0) { validate = true; }
        var containerRectangle = anotherRectangle;
        var relativeRectangle = this;
        if (validate && relativeRectangle.containRectangle(containerRectangle)) {
            containerRectangle = this;
            relativeRectangle = anotherRectangle;
        }
        return new relative_rectangle_1.RelativeRectangle(relativeRectangle.position.y / containerRectangle.height, relativeRectangle.position.x / containerRectangle.width, (relativeRectangle.position.y + relativeRectangle.height) / containerRectangle.height, (relativeRectangle.position.x + relativeRectangle.width) / containerRectangle.width, validate);
    };
    Rectangle.prototype.intersect = function (rectangle) {
        // TODO: calculate rectangle intersection
        return false;
    };
    Rectangle.prototype.containPoint = function (point) {
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
    };
    Rectangle.prototype.containRectangle = function (anotherRectangle) {
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
    };
    Rectangle.prototype.isSame = function (rectangle) {
        if (!this.position.isSame(rectangle.position))
            return false;
        if (this.width !== rectangle.width)
            return false;
        if (this.height !== rectangle.height)
            return false;
        return true;
    };
    Rectangle.prototype.isZero = function () {
        if (!this.position.isZero())
            return false;
        if (this.width !== 0)
            return false;
        if (this.height !== 0)
            return false;
        return true;
    };
    return Rectangle;
}());
exports.Rectangle = Rectangle;
//# sourceMappingURL=/rectangle.js.map