
class Client {
    constructor(){
        this.socket = io.connect(window.location.host);
        this.activateListeners()
    }

    activateListeners(){
        //add custom events here!
        this.socket.on('connect', () => { //when a server connection is established
            this.socket.emit('ready', 'hello from the client side!')
            this.socket.on('ready', (data) => {
                console.log(data.table[0])
                //1. Create a new Player
                //2. Player.play(data)
            });
        });
    }

}

window.addEventListener('load', () => {
    const client = new Client();
})