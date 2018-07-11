class Vector {
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