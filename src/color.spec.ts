/// <reference path="./typings.d.ts" />
import { Color } from './color';

describe('Esi2D.Color', function () {


  it('should set alpha 255 by default', function () {
    let color: Color = new Color(10, 20, 30);

    expect(color.alpha).toEqual(255);
  });


  it('should transform alpha value from decimal to hex', function () {
    let color = new Color(255, 255, 255, 0.5);

    expect(color.alpha).toEqual(Math.floor(0.5 * 255));
  });


  it('should parse rgba string', function () {
    let rgbaString: string = 'rgba(100, 200, 255, 0.3)';
    let color: Color = new Color(rgbaString);

    expect(color.red).toEqual(100);
    expect(color.green).toEqual(200);
    expect(color.blue).toEqual(255);
    expect(color.alpha).toEqual(Math.floor(0.3 * 255));
  });


  it('should parse rgb string', function () {
    let rgbString = 'rgb(100, 200, 255)';
    let color = new Color(rgbString);

    expect(color.red).toEqual(100);
    expect(color.green).toEqual(200);
    expect(color.blue).toEqual(255);
  });


  it('should parse hex string', function () {
    let hexString = '#FFFFFF';
    let color = new Color(hexString);

    expect(color.red).toEqual(255);
    expect(color.green).toEqual(255);
    expect(color.blue).toEqual(255);
  });


  describe('#toString', function () {

    it('should return rgba string', function () {
      let color = new Color(255, 255, 255);

      expect(color.toString()).toEqual('rgba(255,255,255,1)');
    });

  });
  
  describe('#toHexString', function () {
    
    it('should return hex string', function () {
      expect(Color.White.toHexString()).toBe('#ffffff');
      expect(Color.Red.toHexString()).toBe('#ff0000');
      expect(Color.Green.toHexString()).toBe('#00ff00');
      expect(Color.Blue.toHexString()).toBe('#0000ff');
    });
    
  });


  describe('#setAlpha', function () {

    it('should transform alpha value from decimal to hex', function () {
      let color = new Color(255, 255, 255, 255);
      color.setAlpha(0.5);

      expect(color.alpha).toEqual(Math.floor(0.5 * 255));
    });

  });


});