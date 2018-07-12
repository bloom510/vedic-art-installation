
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
                
                new Sequence(data.note_table[4])
             
                //Generate a table
                const grid = new Grid(
                    this.canvas.width, 
                    this.canvas.height, 
                    data.modulus, 
                    this.canvas.context,
                    'purple',
                    data.table
                );
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
            lineWidth: '0.5'
        }); 
    
    const client = new Client(canvas); 
    
})