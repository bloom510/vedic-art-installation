//Consumes data emitted from the server and makes a grid of vectors
class Grid {
    constructor(width, height, modulus, context, color, num_table, client, hiddenContext){
        this.width = width;
        this.height = height;
        this.context = context;
        this.context.strokeStyle = color;
        this.hiddenContext = hiddenContext;
        this.context.fillStyle = 'black';
        this.client = client;

        this.modulus =  modulus;
        this.grid = [];
        
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
                        this.width, this.height, 
                        this.modulus, this.context, 
                        'purple',
                        this.num_table[i][j],
                        1,
                        this.hiddenContext
                    );
                    this.grid.push(vector)
                }
            }
        }
   
        const plotVectors = () => {
            let stepX = (this.width / this.modulus);
            let stepY = (this.height / this.modulus);
            for(let x = 0; x <= this.width; x += stepX){               
                for(let y = 0; y <= this.height; y += stepY){
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
            let image = this.hiddenContext.getImageData(0,0,this.width,this.height); 
            this.context.putImageData(image, 0, 0);
            requestAnimationFrame(() => {
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
                 
            });
        }
        draw();
    }

    highlightNumber(number, hide){
        this.grid.filter((i, n) => {
            if(i.dr === number) {
                !hide ? i.setColor('black'): i.setColor('white');  
            } 
        })

    }
}