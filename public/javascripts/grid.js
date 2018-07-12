class Grid {
    constructor(width, height, modulus, context, color, num_table){
        this.modulus =  modulus;
        this.windowWidth = width;
        this.windowHeight = height;
        this.context = context;
        this.context.strokeStyle = color;
        this.grid = [];
        this.num_table = num_table;

        this.makeVectorGrid();
        this.drawVectorGrid();
        this.findNeighbors();
        setTimeout(() => this.highlightNumber(3), 1000)
        // this.grid[27].setColor('red')
        
    }
    makeVectorGrid(){
        let width = this.windowWidth / this.modulus;
        let height =  this.windowHeight / this.modulus;
        // let y = 0;
        let index = 0;

        const plotVectors = () => {
            for(let x = 0; x <= this.windowWidth; x += (this.windowWidth / this.modulus)){               
                for(let y = 0; y < this.windowHeight; y += (this.windowHeight / this.modulus)){
                    let vector = new Vector(
                        x, y, 
                        this.windowWidth, this.windowHeight, 
                        this.modulus, this.context, 
                        '#107f5d',
                        this.num_table[index]
                    );
                    vector.draw()
                    this.grid.push(vector)
                    index++;
                } 
            }
            console.log(this.grid)
        }
            plotVectors();
      
    }

   drawVectorGrid(){
        for(let i = 0; i < this.grid.length; i++){
            this.grid[i].draw()      
        }
       
    }


    findNeighbors(){
        //TODO: upper and lower neighbors
       for(let i = 0; i < this.grid.length; i++){
            if(i === 0){
                this.grid[i].neighbors.right = this.grid[i + 1];
            } else if(i === this.grid.length - 1){
                this.grid[i].neighbors.left = this.grid[i - 1];
            } else {
                this.grid[i].neighbors.left = this.grid[i - 1];
                this.grid[i].neighbors.right = this.grid[i + 1];
            }
       }
    //    this.drawNeighbor(this.grid[0]);
    }

    drawNeighbor(vector){
        vector.setColor('red')
        if(vector.neighbors.left) {
            let left = vector.neighbors.left;
            left.setColor('purple');
        }
        if(vector.neighbors.right){
            let right = vector.neighbors.right;
            right.setColor('purple')    
        } 
    }

    highlightNumber(number){
        for(let i = 0; i < this.grid.length; i++){
            if(Number(this.grid[i].dr) === Number(number)){
                this.grid[i].setColor('red')
            }
        }
    }

}
