class Grid {
    constructor(width, height, modulus, context){
        this.modulus =  modulus;
        this.windowWidth = width;
        this.windowHeight = height;
        this.context = context;
        this.grid = [];
        this.drawGrid();
    }
    drawGrid(){
        let cell;
        let width = this.windowWidth / this.modulus;
        let height =  this.windowHeight / this.modulus;
        for(let x = 0; x < this.windowWidth; x += this.windowWidth / this.modulus){
            for(let y = 0; y < this.windowHeight; y += this.windowHeight / this.modulus){
            //Draw rectangle
            this.context.strokeRect(x, y, width, height);
            //Plot vector in center of rectangle
            let vector = new Vector(x, y, this.windowWidth, this.windowHeight, this.modulus, this.context)
            vector.draw()
            //Store in memory
            this.grid.push(vector)
            }
        }
    }

}
