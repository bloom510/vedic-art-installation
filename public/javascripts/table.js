class Table {
    constructor(modulus, context){
        this.width = modulus;
        this.height = modulus;
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        this.context = context;
        this.cells = [];
        this.drawGrid();
        
    }
    drawCell(){
        // console.log(this.context)
        this.context.strokeRect(20,20,150,100);
    }
    drawGrid(){
        this.drawCell()
        // for(let x = 0; x < this.windowWidth; x++){
        //     for(let y = 0; y < this.windowHeight; y++){
        //         //boxes[x].draw()
        //     }
        // }
    }
}