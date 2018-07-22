
class Client {
    constructor(){
        this.socket = io.connect(window.location.host);
        this.activateListeners()
    }

    activateListeners(){
        this.socket.on('connect', () => { 
            this.socket.emit('ready', 'hello from the client side!')
            this.socket.on('ready', (data) => {
               this.socket.emit('incoming', {
                   width: window.innerWidth,
                   height: window.innerHeight,
                   dr: 0,
                   radius: 5, 
               })
            });
            this.socket.on('vectors', (data) => console.log(data));

        });
    }

}

window.addEventListener('load', () => {
    new Client()
})