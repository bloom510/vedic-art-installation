
class Client {
    constructor(canvas){
        this.socket = io.connect(window.location.host);
        this.canvas = canvas;
        this.activateListeners()
    }

    activateListeners(){
        this.socket.on('connect', () => { 
            //Initialize
            this.socket.emit('ready', 'hello from the client side!')

            //Detect Height
            this.socket.on('ready', (data) => {
               this.socket.emit('init', {
                   width: window.innerWidth,
                   height: window.innerHeight,
               })
            });

            this.socket.on('img-data', (data) => {
                // let blob = fetch(data, { responseType: 'arrayBuffer'})
                //             .then(res => res.blob())
                //             .then(blob => console.log(blob))
                //             .catch(e => console.log(e))
                let img = new Image();
                img.src = data;
                this.canvas.context.drawImage(img, 0, 0)

                // let blob = new Blob([data], {type: 'image/png'});
                // let blobUrl = window.URL.createObjectURL(blob);
                // let img = new Image();
                // img.src = blobUrl;  
                // document.body.appendChild(img)
                // console.log(blob);

                // this.canvas.context.drawImage(img, 0, 0);
                // window.URL.revokeObjectURL(this.src);             // free memory held by Object URL
   
                // console.log(this.canvas)
                // this.canvas.context.putImageData(blobUrl, 0, 0)
            });
            //Receive data
            
        });
    }

}

window.addEventListener('load', () => {
    const canvas = new Canvas(window.innerWidth, window.innerHeight)
    canvas.init({
        strokeStyle: 'black',
        fillStyle: 'white',
        lineCap: 'round',
        lineWidth: '1'
    }); 
    new Client(canvas)
})