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
   

        let centerX = x + (this.windowWidth / this.modulus) / 2;
        let centerY = y + (this.windowHeight / this.modulus) / 2;

        this.context.beginPath();
        this.context.arc(centerX,centerY,3,0,2*Math.PI);
     

        this.context.strokeRect(
            x, y, 
            this.windowWidth / this.modulus, 
            this.windowHeight / this.modulus
        );
        this.context.stroke();
    }
    drawGrid(){
        for(let x = 0; x < this.windowWidth; x += this.windowWidth / this.modulus){
            for(let y = 0; y < this.windowHeight; y += this.windowHeight / this.modulus)
            this.drawCell(x,y)
        }
    }

}