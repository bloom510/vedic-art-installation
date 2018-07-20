
class Client {
    constructor(canvas){
        this.socket = io.connect(window.location.host);
        this.canvas = canvas;
        this.activateListeners()
    }

    activateListeners(){
        //add custom events here!
        this.socket.on('connect', () => { //when a server connection is established
            this.socket.emit('ready', 'hello from the client side!')
            this.socket.on('ready', (data) => {
                //Generate a table
                new Grid(
                    this.canvas.width, 
                    this.canvas.height, 
                    data.modulus, 
                    this.canvas.context,
                    'black',
                    data.num_table,
                    this,
                    this.canvas.hiddenContext
                );
                
            
                // new Sequence(data, grid)
            });
        });
    }

}

window.addEventListener('load', () => {
    const canvas = new Canvas(window.innerWidth, window.innerHeight);
    canvas.init({
            strokeStyle: 'black',
            fillStyle: 'white',
            lineCap: 'round',
            lineWidth: '1'
        });  
})