(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Esi2d = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var Color = (function () {
    function Color(red, green, blue, alpha) {
        if (red === void 0) { red = 255; }
        if (green === void 0) { green = 255; }
        if (blue === void 0) { blue = 255; }
        if (alpha === void 0) { alpha = 255; }
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
        if (typeof arguments[0] === 'string') {
            return Color.parse(arguments[0]);
        }
        this.setAlpha(alpha);
    }
    Color.parse = function (colorString) {
        colorString = colorString.replace(/\s/g, '');
        var hexRegex = /#[0-9a-fA-F]{3,6}/, rgbRegex = /rgb.?([0-9.]+),([0-9.]+),([0-9.]+)/, rgbaRegex = /rgba.?([0-9.]+),([0-9.]+),([0-9.]+),([0-9.]+)/, match;
        switch (true) {
            case hexRegex.test(colorString): {
                return Color.createByHexRgb(colorString);
            }
            case rgbaRegex.test(colorString): {
                match = colorString.match(rgbaRegex);
                return new Color(parseInt(match[1]), parseInt(match[2]), parseInt(match[3]), parseFloat(match[4]));
            }
            case rgbRegex.test(colorString): {
                match = colorString.match(rgbRegex);
                return new Color(parseInt(match[1]), parseInt(match[2]), parseInt(match[3]));
            }
            default: {
                throw new TypeError('unknown color ' + colorString);
            }
        }
    };
    Color.createByHexRgb = function (hexColorString) {
        hexColorString = hexColorString.replace(' ', '').replace('#', '');
        if (hexColorString.length === 3) {
            return new Color(parseInt(hexColorString[0] + hexColorString[0], 16), parseInt(hexColorString[1] + hexColorString[1], 16), parseInt(hexColorString[2] + hexColorString[2], 16));
        }
        else {
            for (var i = 0; i < (6 - hexColorString.length); i++) {
                hexColorString += 'f';
            }
            return new Color(parseInt(hexColorString.slice(0, 2), 16), parseInt(hexColorString.slice(2, 4), 16), parseInt(hexColorString.slice(4, 6), 16));
        }
    };
    Color.prototype.toString = function () {
        return 'rgba(' + this.red + ',' + this.green + ',' + this.blue + ',' + this.alpha + ')';
    };
    Color.prototype.toHexString = function () {
        var r = this.red.toString(16);
        var g = this.green.toString(16);
        var b = this.blue.toString(16);
        if (r.length < 2)
            r = '0' + r;
        if (g.length < 2)
            g = '0' + g;
        if (b.length < 2)
            b = '0' + b;
        return '#' + r + g + b;
    };
    Color.prototype.setAlpha = function (alpha) {
        if (alpha <= 1) {
            alpha = Math.floor(alpha * 255);
        }
        this.alpha = alpha;
    };
    Color.White = new Color(255, 255, 255);
    Color.Black = new Color(0, 0, 0);
    Color.Red = new Color(255, 0, 0);
    Color.Green = new Color(0, 255, 0);
    Color.Blue = new Color(0, 0, 255);
    Color.Yellow = new Color(255, 255, 0);
    Color.Cyan = new Color(0, 255, 255);
    Color.Purple = new Color(255, 0, 255);
    return Color;
}());
exports.Color = Color;

},{}],2:[function(require,module,exports){
/// </// <reference path="./typings.d.ts" />
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./color'));
__export(require('./point'));
__export(require('./line'));
__export(require('./relative-rectangle'));
__export(require('./rectangle'));
__export(require('./polygon'));
__export(require('./utilities'));

},{"./color":1,"./line":3,"./point":4,"./polygon":5,"./rectangle":6,"./relative-rectangle":7,"./utilities":8}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var rectangle_1 = require('./rectangle');
var point_1 = require('./point');
var line_1 = require('./line');
var Polygon = (function (_super) {
    __extends(Polygon, _super);
    function Polygon() {
        _super.call(this);
        this.points = [];
        this.sides = [];
    }
    Polygon.prototype.translate = function (point) {
        for (var i = 0; i < this.points.length; i++) {
            this.points[i].translate(point);
        }
        this.calculateBoundary();
    };
    Polygon.prototype.addPoint = function (point) {
        if (this.indexOf(point) !== -1) {
            return false;
        }
        this.points.push(point);
        this.calculateBoundary();
        this.calculateSides();
        return true;
    };
    Polygon.prototype.removePoint = function (point) {
        var index = this.indexOf(point);
        if (index === -1) {
            return false;
        }
        this.points = this.points.splice(index, 1);
        this.calculateBoundary();
        this.calculateSides();
        return true;
    };
    Polygon.prototype.indexOf = function (point) {
        return this.points.indexOf(point);
    };
    Polygon.prototype.containPoint = function (point) {
        if (!rectangle_1.Rectangle.prototype.containPoint.call(this, point))
            return false;
        var pointOutside = new point_1.Point(-1, -1);
        var rayLine = new line_1.Line(pointOutside, point);
        var line;
        var collideCount = 0;
        for (var i = 0; i < this.sides.length; i++) {
            line = this.sides[i];
            if (line.intersect(rayLine))
                collideCount++;
        }
        if (collideCount % 2 === 0) {
            return false;
        }
        return true;
    };
    Polygon.prototype.calculateBoundary = function () {
        var point = this.points[0];
        var minX = point.x;
        var maxX = point.x;
        var minY = point.y;
        var maxY = point.y;
        for (var i = 1; i < this.points.length; i++) {
            point = this.points[i];
            if (point.x < minX) {
                minX = point.x;
            }
            else if (point.x > maxX) {
                maxX = point.x;
            }
            if (point.y < minY) {
                minY = point.y;
            }
            else if (point.y > maxY) {
                maxY = point.y;
            }
        }
        this.position.x = minX;
        this.position.y = minY;
        this.width = maxX - minX;
        this.height = maxY - minY;
    };
    Polygon.prototype.calculateSides = function () {
        if (this.points.length < 2)
            return;
        this.sides = [];
        for (var i = 0; i < this.points.length - 1; i++) {
            for (var j = i + 1; j < this.points.length; j++) {
                this.sides.push(new line_1.Line(this.points[i], this.points[j]));
            }
        }
    };
    return Polygon;
}(rectangle_1.Rectangle));
exports.Polygon = Polygon;

},{"./line":3,"./point":4,"./rectangle":6}],6:[function(require,module,exports){
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
    Rectangle.prototype.getRelativeRectangle = function (anotherRectangle, validate) {
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

},{"./point":4,"./relative-rectangle":7}],7:[function(require,module,exports){
"use strict";
var utilities_1 = require('./utilities');
var RelativeRectangle = (function () {
    function RelativeRectangle(top, left, bottom, right, validate) {
        if (top === void 0) { top = 0; }
        if (left === void 0) { left = 0; }
        if (bottom === void 0) { bottom = 0; }
        if (right === void 0) { right = 0; }
        if (validate === void 0) { validate = true; }
        this.top = top;
        this.left = left;
        this.bottom = bottom;
        this.right = right;
        if (validate) {
            if (bottom < top) {
                var temp = top;
                this.top = bottom;
                this.bottom = temp;
            }
            if (right < left) {
                var temp = left;
                this.left = right;
                this.right = temp;
            }
        }
        this.top = utilities_1.setPrecision(this.top, 4);
        this.left = utilities_1.setPrecision(this.left, 4);
        this.bottom = utilities_1.setPrecision(this.bottom, 4);
        this.right = utilities_1.setPrecision(this.right, 4);
    }
    return RelativeRectangle;
}());
exports.RelativeRectangle = RelativeRectangle;

},{"./utilities":8}],8:[function(require,module,exports){
"use strict";
function setPrecision(value, precision) {
    var mul = Math.pow(10, precision);
    return Math.round(value * mul) / mul;
}
exports.setPrecision = setPrecision;

},{}]},{},[2])(2)
});