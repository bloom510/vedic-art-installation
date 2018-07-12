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
    this.table = [];
    this.populate(modulus);
    this.modulus = modulus;
  }
  populate(modulus){
    let cell;
    for(let i = 1; i <= modulus; i++){
      this.note_table[i - 1] = [];
      for(let j = 1; j <= modulus; j++){
        if((1 + (i*j) - 1) % modulus === 0) {
            cell = this.scale[(modulus - 1) % this.scale.length];
            this.note_table[i - 1].push(cell);
            this.table.push(modulus)
        } else {
          cell = ((1 + (i*j) - 1) % modulus)
          this.note_table[i - 1].push(
          this.scale[(cell - 1) % this.scale.length]
          );
          this.table.push(cell)
        }
      }
    }
  }
}

const vedic = new Vedic(27, 'major', 'C');
module.exports = vedic;

/*
Notes:
- The populate function hits two birds with one stone by calculating numbers and converting them into letters on the fly. 

- Visual art can be made by algorithmically drawing a square grid of Modulus x Modulus dimensions on a canvas, storing the center coordinates of each box, and tracing the reflection symmetry of any given cell. 

- To take it a step further, we can also use the algorithm to traverse color space using Richard Merrick's pitch-to-color model.
*/