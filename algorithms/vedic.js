
class Vedic {
  constructor(modulus, scale, key){
    this.num_table = [];
    this.populate(modulus);
    this.modulus = modulus;
  }
  populate(modulus){
    let number;
    let tmp = [];
  
    for(let i = 1; i <= modulus; i++){
      for(let j = 1; j <= modulus; j++){
        if((i*j) % modulus === 0) {   
            tmp.push(modulus)
            if(tmp.length === modulus){
              this.num_table.push(tmp)
              tmp = [];
            }

        } else {
          number = (i*j) % modulus;
          tmp.push(number)
        }
      }
    }
  }
}

const vedic = new Vedic(9);

module.exports = vedic;

/*
Notes:
- The populate function hits two birds with one stone by calculating numbers and converting them into letters on the fly. 

- Visual art can be made by algorithmically drawing a square grid of Modulus x Modulus dimensions on a canvas, storing the center coordinates of each box, and tracing the reflection symmetry of any given cell. 

- To take it a step further, we can also use the algorithm to traverse color space using Richard Merrick's pitch-to-color model.
*/