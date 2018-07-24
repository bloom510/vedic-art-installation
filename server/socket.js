
//make sure to require any app business logic
const vedic = require('../algorithms/vedic');
const Grid = require('./grid')
const NodeCanvas = require('./node-c')
var ss = require('socket.io-stream');

class Socket {
    constructor(app, PORT, canvas){
        this.server = require('http').createServer(app); 
        this.io = require('socket.io')(this.server) 
        this.canvas = canvas;
        this.grid = [];
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
                socket.emit('ready', vedic)
            });

            //When initialized, ie user loads page
            socket.on('init', (data) => {
                // console.log(data.width, data.height)
                this.canvas = new NodeCanvas(data.width,data.height)
                const grid = new Grid(
                    data.width, 
                    data.height, 
                    vedic.modulus, 
                    this.canvas.context,
                    'black',
                    vedic.num_table,
                    this.canvas,
                    this
                );

            });

            // socket.on('stream', () => {
            //     //Node canvas handleStream goes here
            // })

        });
    }

}

module.exports = Socket;