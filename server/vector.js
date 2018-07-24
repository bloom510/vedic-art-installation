module.exports = class Vector {
    constructor(x, y, context, color, dr, radius){
        this.x = x;
        this.y = y;
        this.dr = dr;
        this.radius = radius;
        this.context = context;
        this.neighbors = {};
        this.setColor(color)
        
    }

    setColor(color){
        this.context.fillStyle = color;
        this.draw();
    }
    draw(){
        this.context.moveTo(this.x, this.y)
        this.context.beginPath();
        this.context.arc(this.x,this.y,this.radius,1,2*Math.PI);
        this.context.fill();
        this.context.closePath();
        

    }
    
}

