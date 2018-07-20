class Vector {
    constructor(x, y, 
        width, height, 
        modulus, context,
        color, dr, radius, hiddenContext){
        this.x = x;
        this.y = y;
        this.dr = dr;
        this.radius = radius;
        this.context = context;
        this.hiddenContext = hiddenContext;
        this.neighbors = {};
        this.setColor(color)
        // this.draw()
        
    }

    setColor(color){
        this.context.fillStyle = color;
        this.draw();
    }
    draw(){
        this.hiddenContext.moveTo(this.x, this.y)
        this.hiddenContext.beginPath();
        this.hiddenContext.arc(this.x,this.y,this.radius,1,2*Math.PI);
        this.hiddenContext.stroke();
        this.hiddenContext.closePath();

    }
    
}