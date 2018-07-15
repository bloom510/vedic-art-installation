const Range = require("tonal-range")
const Transpose = require("tonal-transpose")
const Dictionary = require("tonal-dictionary");

class Vedic {
  constructor(modulus, scale, key){
    this.scale = Range.scale(
     Dictionary
    .scale(scale)
    .map(Transpose.transpose(`${key}2`)), [`${key}2`, `${key}6`]
    );
    this.note_table = [];
    this.num_table = [];
    this.populate(modulus);
    this.modulus = modulus;
  }
  populate(modulus){
    let number;
    let note;
    let tmp = [];
    for(let i = 1; i <= modulus; i++){
      this.note_table[i - 1] = [];
      for(let j = 1; j <= modulus; j++){
    /*TODO: for numbers, subdivide nested arrays by the modulus*/
    //1. Push numbers into a temporary array 
    //2. If number is the last member of a given row,
    //   push tmp to num_table and reset tmp to empty array
        if((1 + (i*j) - 1) % modulus === 0) {
            note = this.scale[(modulus - 1) % this.scale.length];
            this.note_table[i - 1].push(note);
         
            tmp.push(modulus)
            if(tmp.length === modulus){
              this.num_table.push(tmp)
              tmp = [];
            }
        } else {
          number = ((1 + (i*j) - 1) % modulus)
          this.note_table[i - 1].push(
          this.scale[(number - 1) % this.scale.length]
          );
          tmp.push(number)
        }
      }
    }
  }
}

const vedic = new Vedic(300, 'chromatic', 'C');
console.log(vedic.num_table)

module.exports = vedic;

/*
Notes:
- The populate function hits two birds with one stone by calculating numbers and converting them into letters on the fly. 

- Visual art can be made by algorithmically drawing a square grid of Modulus x Modulus dimensions on a canvas, storing the center coordinates of each box, and tracing the reflection symmetry of any given cell. 

- To take it a step further, we can also use the algorithm to traverse color space using Richard Merrick's pitch-to-color model.
*/