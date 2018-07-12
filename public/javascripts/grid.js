class Grid {
    constructor(width, height, modulus, context, strokeStyle){
        this.modulus =  modulus;
        this.windowWidth = width;
        this.windowHeight = height;
        this.context = context;
        this.context.strokeStyle = strokeStyle;
        this.grid = [];

        this.makeVectorGrid();
        this.drawVectorGrid();
        this.colorDot();
    }
    findNeighbors(){
       for(let i = 0; i < this.grid.length; i++){
            if(i === 0){
                //it has a right neighbor
                // neighbor = this.grid[i + 1]
            }
            if(i === this.grid.length - 1){
                //it has a left neighbor
                //neighbor = neighbor this.grid[i - 1]
            }
            //it has both right and left neighbors
            //neighborLeft = this.grid[i - 1]
            //neighborRight = this.grid[i + 1]
       }
    }
    makeVectorGrid(){
        let cell;
        let width = this.windowWidth / this.modulus;
        let height =  this.windowHeight / this.modulus;
        for(let x = 0; x < this.windowWidth; x += this.windowWidth / this.modulus){
            for(let y = 0; y < this.windowHeight; y += this.windowHeight / this.modulus){
            let vector = new Vector(x, y, this.windowWidth, this.windowHeight, this.modulus, this.context, '#107f5d')
            vector.draw()
            this.grid.push(vector)
            }
        }
       
    }
   drawVectorGrid(){
        for(let i = 0; i < this.grid.length; i++){
            this.grid[i].draw()      
        }
       
    }
    colorDot(){
        this.grid[0].setColor('red');
        this.grid[0].draw();
    }

}
