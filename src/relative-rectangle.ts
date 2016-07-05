import { setPrecision } from './utilities';

export class RelativeRectangle {
  
  constructor(public top: number = 0,
              public left: number = 0,
              public bottom: number = 0,
              public right: number = 0,
              validate: boolean = true) {

    if (validate) {

      if (bottom < top) {
        let temp: number = top;
        this.top = bottom;
        this.bottom = temp;
      }

      if (right < left) {
        let temp: number = left;
        this.left = right;
        this.right = temp;
      }
    
    }
    
    this.top = setPrecision(this.top, 4);
    
    this.left = setPrecision(this.left, 4);
    
    this.bottom = setPrecision(this.bottom, 4);
    
    this.right = setPrecision(this.right, 4);
  }

}