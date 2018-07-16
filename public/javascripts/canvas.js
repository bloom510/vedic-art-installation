
class Canvas {
    constructor(width, height) {
        this.global = {}; 
        this.width = width;
        this.height = height;
        this.context, this.namespace;
        this.client = new Client(this)
  
    }

    init(params){
        //Create a canvas
        const canvas = document.createElement('canvas');
        canvas.id = 'canvas';
        canvas.width = this.width;
        canvas.height = this.height;
        document.body.appendChild(canvas);

        //Setup
        this.context = canvas.getContext('2d');
        this.context.strokeStyle = params.strokeStyle;
        this.context.fillStyle = params.fillStyle;
        this.context.lineCap = params.lineCap;
        this.context.lineWidth = params.lineWidth;

        //Fill background and track mouse
        this.context.fillRect(0, 0, this.width, this.height);
        
    }

    //Cartesian distance formula
    getDistance(x1, y1, x2, y2) {
        return Math.abs(Math.sqrt(Math.pow(x2 - x1, 2) - Math.pow(y2 - y1, 2)));
    }

}
