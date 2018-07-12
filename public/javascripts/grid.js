class Grid {
    constructor(width, height, modulus, context, color){
        this.modulus =  modulus;
        this.windowWidth = width;
        this.windowHeight = height;
        this.context = context;
        this.context.strokeStyle = color;
        this.grid = [];

        this.makeVectorGrid();
        this.drawVectorGrid();
        this.findNeighbors();
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
       this.drawNeighbor(this.grid[6]);
    }
    drawNeighbor(vector){
     
        if(vector.neighbors.left) {
        let left = vector.neighbors.left;
        left.setColor('red');
        }
        if(vector.neighbors.right){
            let right = vector.neighbors.right;
            right.setColor('red')    
        }
        
        vector.setColor('blue')
    }
    makeVectorGrid(){
        let cell;
        let width = this.windowWidth / this.modulus;
        let height =  this.windowHeight / this.modulus;
        let y = 0;
        const plotVectors = () => {
            for(let x = 0; x <= this.windowWidth; x += this.windowWidth / this.modulus){               
                let vector = new Vector(x, y, this.windowWidth, this.windowHeight, this.modulus, this.context, '#107f5d')
                vector.draw()
                this.grid.push(vector)
            }
        }

        while(y < this.windowHeight){
            plotVectors(y);
            y += this.windowHeight / this.modulus;
        }
        
 
       
    }
   drawVectorGrid(){
        for(let i = 0; i < this.grid.length; i++){
            this.grid[i].draw()      
        }
       
    }

}
