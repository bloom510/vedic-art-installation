class Table {
    constructor(width, height, modulus, context){
        this.modulus =  modulus;
        this.windowWidth = width;
        this.windowHeight = height;
        this.context = context;
        this.cells = [];
        this.drawGrid();
        
    }
    drawCell(x, y){
        // console.log(this.context)
        this.context.strokeRect(
            x, y, 
            this.windowWidth / this.modulus, 
            this.windowHeight / this.modulus
        );
    }
    drawGrid(){
        for(let x = 0; x < this.windowWidth; x += this.windowWidth / this.modulus){
            for(let y = 0; y < this.windowHeight; y += this.windowHeight / this.modulus)
            this.drawCell(x,y)
        }
    }
}