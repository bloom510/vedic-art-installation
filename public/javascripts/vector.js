class Vector {
    constructor(x, y, width,height, modulus, context, color, dr){
        this.x = x + (width / modulus) / 2;
        this.y = y + (height / modulus) / 2;
        this.dr = dr;
        this.context = context;
        this.neighbors = {};
        this.setColor(color)
        this.draw()
    }
 
    setColor(color){
        this.context.fillStyle = color;
        this.draw();
    }
    draw(){
        this.context.moveTo(this.x, this.y)
        this.context.beginPath();
        this.context.arc(this.x,this.y,10,0,2*Math.PI);
        this.context.fill();
        this.context.closePath();
    }
}