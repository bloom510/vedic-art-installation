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
        //Draws the entire grid
        // this.drawVectorGrid();
        //Highlights a specific number
        // this.highlightNumber(this.grid[i].dr)
        this.drawSequence();
        
        //Finds neighbors if needed
        // this.findNeighbors();
        //Draws neighbors 
        // this.drawNeighbor(this.grid[1])
        //Set color to a specific vector
        // this.grid[2].setColor('red')
        
    }
    makeVectorGrid(){
        const width = this.windowWidth / this.modulus;
        const height =  this.windowHeight / this.modulus;
        let index = 0;
        let vector;
        
        const makeVectors = () => {
            for(let i = 0; i < this.modulus; i++){
                for(let j = 0; j < this.modulus; j++){
                    vector = new Vector(
                        0, 0, 
                        this.windowWidth, this.windowHeight, 
                        this.modulus, this.context, 
                        '#107f5d',
                        this.num_table[i][j],
                        1
                    );
                    this.grid.push(vector)
                }
            }
        }
   
        const plotVectors = () => {
            let stepX = (this.windowWidth / this.modulus);
            let stepY = (this.windowHeight / this.modulus);
            for(let x = 10; x <= this.windowWidth; x += stepX){               
                for(let y = 15; y <= this.windowHeight; y += stepY){
                    if(index <= this.grid.length - 1){
                        this.grid[index].x = x;
                        this.grid[index].y = y;
                        index++;
                    }     
                }   
            }
        }
        makeVectors();
        plotVectors();
        // console.log(this.grid);
    }

   drawVectorGrid(){
        for(let i = 0; i < this.grid.length; i++){
            this.grid[i].draw()      
        }
    }
    drawSequence(){
        let index = 0;
        const draw = () => {
            this.highlightNumber(this.grid[index].dr);
            requestAnimationFrame(() => {
                if(index <= this.modulus - 1){
                    draw();
                    console.log(index)
                    index++;
                }
            });
        }
        draw(); 
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
    //Store number as state in a hash? So we can deselect previous?
        for(let i = 0; i < this.grid.length; i++){
            if(this.grid[i].dr === number){
                this.grid[i].setColor('orange')
            }
        }
    }

}
