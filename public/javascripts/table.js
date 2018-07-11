class Table {
    constructor(width, height, modulus, context){
        this.modulus =  modulus;
        this.windowWidth = width;
        this.windowHeight = height;
        this.context = context;
        this.vector = class Vector {
            constructor(x, y, windowWidth, windowHeight, modulus, context){
                this.x = x;
                this.y = y;
                this.cx = x + (windowWidth / modulus) / 2;
                this.cy = y + (windowHeight / modulus) / 2;
                this.context = context;
                this.draw(windowWidth, windowHeight)
            }
            draw(windowWidth, windowHeight){
                this.context.beginPath();
                this.context.arc(this.cx,this.cy,3,0,2*Math.PI);
                this.context.stroke();
                this.context.closePath();
            }
        }
        this.cells = [];
        this.drawGrid();
        
    }
    drawCell(x, y){
        this.context.beginPath();
        this.context.arc(cx,cy,3,0,2*Math.PI);
    
        this.context.stroke();
        this.context.closePath();
    }
    drawGrid(){
        let cell;
        for(let x = 0; x < this.windowWidth; x += this.windowWidth / this.modulus){
            for(let y = 0; y < this.windowHeight; y += this.windowHeight / this.modulus){
            //Draw rectangle
            this.context.strokeRect(
                x, y, 
                this.windowWidth / this.modulus, 
                this.windowHeight / this.modulus
            );

            //Plot vector in center of rectangle
            let vector = new this.vector(x, y, this.windowWidth, this.windowHeight, this.modulus, this.context)
            vector.draw()
            this.cells.push(vector)
            }
        
        }
    }

}
