export function setPrecision(value: number, precision: number): number {
  var mul = Math.pow(10, precision);
  return Math.round(value * mul) / mul;
}