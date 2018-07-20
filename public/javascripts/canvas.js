
class Canvas {
    constructor(width, height) {
        this.global = {}; 
        this.width = width;
        this.height = height;
        this.context, this.hiddenContext, this.namespace;
        this.client = new Client(this)
  
    }

    init(params){
        //Create a canvas
        const canvas = document.createElement('canvas');
        canvas.id = 'canvas';
        canvas.width = this.width;
        canvas.height = this.height;

        document.body.appendChild(canvas);

        const hiddenCanvas = document.createElement('canvas');
        hiddenCanvas.id = 'hiddenCanvas';
        hiddenCanvas.width = this.width;
        hiddenCanvas.height = this.height;
        hiddenCanvas.style.display = 'none';
        document.body.appendChild(hiddenCanvas);
      

        //Setup
        this.context = canvas.getContext('2d');
        this.context.strokeStyle = params.strokeStyle;
        this.context.fillStyle = params.fillStyle;
        this.context.lineCap = params.lineCap;
        this.context.lineWidth = params.lineWidth;

        this.hiddenContext = hiddenCanvas.getContext('2d');
        this.hiddenContext.strokeStyle = params.strokeStyle;
        this.hiddenContext.fillStyle = params.fillStyle;
        this.hiddenContext.lineCap = params.lineCap;
        this.hiddenContext.lineWidth = params.lineWidth;
        

        //Fill background and track mouse
        this.context.fillRect(0, 0, this.width, this.height);
        
    }

}
