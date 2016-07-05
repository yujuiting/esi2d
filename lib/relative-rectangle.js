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
//# sourceMappingURL=/relative-rectangle.js.map