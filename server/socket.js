
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
            socket.on('ready', (data) => {
                console.log(data)
                socket.emit('ready', 'hello from the server side!')
            })
        })
    }

}

module.exports = Socket;