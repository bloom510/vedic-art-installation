const Vector = require('./vector')
const fs = require('fs')
const axios = require('axios')

module.exports = class Grid {
    constructor(width, height, modulus, context, color, num_table, canvas, socket){
        this.width = width;
        this.height = height;
        this.canvas = canvas;
        this.context = context;
        this.context.strokeStyle = color;
        this.context.fillStyle = 'black';
        this.socket = socket;

        this.modulus =  modulus;
        this.grid = [];
        console.log('mod', this.modulus)
        
        this.num_table = num_table;

        this.makeVectorGrid();
        this.drawGrid();

        
    }
    makeVectorGrid(){
        const width = this.width;
        const height =  this.height;
        let index = 0;
        let vector;

        const makeVectors = () => {
            for(let i = 0; i < this.modulus; i++){
                for(let j = 0; j < this.modulus; j++){
                    vector = new Vector(
                        0, 0, 
                        this.context, 
                        'purple',
                        this.num_table[i][j],
                        4
                    );
                    this.grid.push(vector)
                    // console.log(this.grid.length)
                }
            }
        }
   
        const plotVectors = () => {
            let stepX = (this.width / this.modulus);
            let stepY = (this.height / this.modulus);
            for(let x = 30; x <= this.width; x += stepX){               
                for(let y = 30; y <= this.height; y += stepY){
                    if(index <= this.grid.length - 1){
                        this.grid[index].x = Math.floor(x);
                        this.grid[index].y = Math.floor(y);
                        index++;
                    }     
                }   
            }
        }
        makeVectors();
        plotVectors();
    }

 
    drawGrid(){

        let index = 0;
        let reverse = false;
        const draw = () => {

            setTimeout(() => {
        
        //Set up write stream to filesystem
        // const out = fs.createWriteStream(__dirname + `/${index}.png`)
        //Stream data 
        // let stream = this.canvas.canvas.pngStream().pipe(out);
        //On data, write chunk to the filesystem
        // stream.on('data', (chunk) => {
            // console.log(chunk)
        //   out.write(chunk);
            //  data += chunk;
        // });
          let dataUrl = this.canvas.canvas.toDataURL();
          this.socket.io.emit('img-data', dataUrl)
        
     
        this.highlightNumber(this.grid[index].dr, reverse);
                
                // whole square: index <= this.modulus - 1 
                // single row: index % this.modulus === 0 

                if(index === 0){
                    reverse = false;
                }
                
                if(index === this.modulus - 1){
                    reverse = true;
                    
                }  

                if(!reverse){
                    if(index < this.modulus - 1){
                        draw();
                        index++;
                    } 
                } 

                if(reverse) {
                    draw();
                    index--;
                }
                 
            }
            , 100);
        }
        draw();
        
    }

    highlightNumber(number, hide){
        this.grid.filter((i, n) => {
            if(i.dr === number) {
                !hide ? i.setColor('black'): i.setColor('white');




                // let encodedCanvas = this.canvas.canvas.toDataURL()
                            // .replace(/^data:image\/(png|jpg);base64,/, "");
                
                // this.socket.io.emit('img-data', encodedCanvas)

                // const byteCharacters = atob(encodedCanvas);
                // let byteNumbers = new Array(byteCharacters.length);

                // for (var i = 0; i < byteCharacters.length; i++) {
                //     byteNumbers[i] = byteCharacters.charCodeAt(i);
                // }
                
                // let byteArray = new Uint8Array(byteNumbers);

                
                // console.log(byteArray)
                
           
            } 
        })

    }
}