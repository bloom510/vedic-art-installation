class Grid {
    constructor(width, height, modulus, context, color, vTable){
        this.modulus =  modulus;
        this.windowWidth = width;
        this.windowHeight = height;
        this.context = context;
        this.context.strokeStyle = color;
        this.grid = [];
        this.vTable = vTable;

        this.makeVectorGrid();
        this.drawVectorGrid();
        // this.findNeighbors();
        this.highlightMultiple(2)
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

    highlightMultiple(number){
        if(!number - 1 === 0) number = number - 1;
        //iterate through the array
        for(let i = 0; i < this.grid.length; i++){
            // console.log(this.grid[i])
            // if(i % number === 0){
            //     this.grid[i].setColor('orange')
            // }
        }
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
                for(let v = 0; v < this.vTable.length; v++){
                    let vector = new Vector(
                        x, y, 
                        this.windowWidth, this.windowHeight, 
                        this.modulus, this.context, 
                        '#107f5d',
                        this.vTable[v]
                    );
                    vector.draw()
                    this.grid.push(vector)
                 
                }

            }
            
            
            
            // console.log(this.grid)
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
