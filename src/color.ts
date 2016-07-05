export class Color {
  
	static White   = new Color(255, 255, 255);

	static Black   = new Color(0, 0, 0);

	static Red     = new Color(255, 0, 0);

	static Green   = new Color(0, 255, 0);

	static Blue    = new Color(0, 0, 255);

	static Yellow  = new Color(255, 255, 0);

	static Cyan    = new Color(0, 255, 255);

	static Purple  = new Color(255, 0, 255);

  static parse(colorString: string): Color {

    colorString = colorString.replace(/\s/g, '');

    var hexRegex = /#[0-9a-fA-F]{3,6}/,
        rgbRegex = /rgb.?([0-9.]+),([0-9.]+),([0-9.]+)/,
        rgbaRegex = /rgba.?([0-9.]+),([0-9.]+),([0-9.]+),([0-9.]+)/,
        match;

    switch (true) {
      case hexRegex.test(colorString): {
        return Color.createByHexRgb(colorString);
      }

      case rgbaRegex.test(colorString): {
        match = colorString.match(rgbaRegex);
        return new Color(
          parseInt(match[1]),
          parseInt(match[2]),
          parseInt(match[3]),
          parseFloat(match[4]));
      }

      case rgbRegex.test(colorString): {
        match = colorString.match(rgbRegex);
        return new Color(
          parseInt(match[1]),
          parseInt(match[2]),
          parseInt(match[3]));
      }

      default: {
        throw new TypeError('unknown color ' + colorString);
      }
    }
  }

  static createByHexRgb(hexColorString: string): Color {
    hexColorString = hexColorString.replace(' ', '').replace('#', '');

    if (hexColorString.length === 3) {
      return new Color(
        parseInt(hexColorString[0] + hexColorString[0], 16),
        parseInt(hexColorString[1] + hexColorString[1], 16),
        parseInt(hexColorString[2] + hexColorString[2], 16));
    } else {
      for (var i = 0; i < (6 - hexColorString.length); i++) {
        hexColorString += 'f';
      }
      return new Color(
        parseInt(hexColorString.slice(0, 2), 16),
        parseInt(hexColorString.slice(2, 4), 16),
        parseInt(hexColorString.slice(4, 6), 16));
    }
  }

  constructor(public red: number|string = 255,
              public green: number = 255,
              public blue: number = 255,
              public alpha: number = 255) {
    
    if (typeof arguments[0] === 'string') {
      return Color.parse(arguments[0]);
    }

    this.setAlpha(alpha);
  }

  toString(): string {
    return 'rgba(' + this.red + ',' + this.green + ',' + this.blue + ',' + this.alpha + ')';
  }

  toHexString(): string {
    var r = this.red.toString(16);
    var g = this.green.toString(16);
    var b = this.blue.toString(16);
    if (r.length < 2) r = '0' + r;
    if (g.length < 2) g = '0' + g;
    if (b.length < 2) b = '0' + b;
    return '#' + r + g + b;
  }

  setAlpha(alpha: number): void {
    if (alpha <= 1) {
      alpha = Math.floor(alpha * 255);
    }

    this.alpha = alpha;
  }

}