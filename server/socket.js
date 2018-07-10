
//make sure to require any app business logic
const vedic = require('../algorithms/vedic');

class Socket {
    constructor(app, PORT){
        this.server = require('http').createServer(app); 
        this.io = require('socket.io')(this.server) 
        this.init(PORT)
    }
    init(PORT){
        this.server.listen(PORT, () => {
            console.log(`app listening on port ${PORT}`)
            this.activateListeners()
        })
    }
    activateListeners(){
        this.io.on('connection', (socket) => { 
            //add custom events here!
            socket.on('ready', (data) => {
                socket.emit('ready', vedic)
            })
        })
    }

}

module.exports = Socket;