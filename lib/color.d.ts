export declare class Color {
    red: number | string;
    green: number;
    blue: number;
    alpha: number;
    static White: Color;
    static Black: Color;
    static Red: Color;
    static Green: Color;
    static Blue: Color;
    static Yellow: Color;
    static Cyan: Color;
    static Purple: Color;
    static parse(colorString: string): Color;
    static createByHexRgb(hexColorString: string): Color;
    constructor(red?: number | string, green?: number, blue?: number, alpha?: number);
    toString(): string;
    toHexString(): string;
    setAlpha(alpha: number): void;
}
