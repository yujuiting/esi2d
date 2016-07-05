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
        if (arguments[0] === 'string') {
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
//# sourceMappingURL=/color.js.map