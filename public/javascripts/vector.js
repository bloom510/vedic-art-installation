class Vector {
    constructor(x, y, windowWidth, windowHeight, modulus, context, fillStyle){
        this.x = x;
        this.y = y;
        this.cx = x + (windowWidth / modulus) / 2;
        this.cy = y + (windowHeight / modulus) / 2;
        this.context = context;
        this.context.fillStyle = fillStyle;
        this.draw(windowWidth, windowHeight)
    }
    draw(windowWidth, windowHeight){
        this.context.beginPath();
        this.context.arc(this.cx,this.cy,2,0,2*Math.PI);
        this.context.fill();
        this.context.closePath();
    }
}