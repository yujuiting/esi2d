"use strict";
function setPrecision(value, precision) {
    var mul = Math.pow(10, precision);
    return Math.round(value * mul) / mul;
}
exports.setPrecision = setPrecision;
//# sourceMappingURL=/utilities.js.map