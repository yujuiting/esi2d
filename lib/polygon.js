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
//# sourceMappingURL=/polygon.js.map