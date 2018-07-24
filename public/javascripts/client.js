//Responds to Socket.io server event emissions
class Client {
    constructor(canvas){
        this.socket = io.connect(window.location.host);
        this.canvas = canvas;
        this.activateListeners()
    }

    activateListeners(){
        this.socket.on('connect', () => { 
            this.socket.emit('ready', 'hello from the client side!')
            this.socket.on('ready', (data) => {
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
            });
            this.socket.on('test', (data) => {
                console.log(data)
            })
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