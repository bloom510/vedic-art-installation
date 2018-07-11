
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
                //Hard coded musical sequence
                let player = new Player(data.table[4])
                //Generate a table
                new Table(
                    this.canvas.width, 
                    this.canvas.height, 
                    data.modulus, 
                    this.canvas.context
                );
            });
        });
    }

}

window.addEventListener('load', () => {
    
    const canvas = new Canvas(window.innerWidth / 1.25, window.innerHeight / 1.25);
    canvas.init({
            strokeStyle: 'black',
            fillStyle: 'white',
            lineCap: 'round',
            lineWidth: '0.5'
        }); 
    
    const client = new Client(canvas); 
    
})