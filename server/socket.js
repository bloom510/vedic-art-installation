
//make sure to require any app business logic
const vedic = require('../algorithms/vedic');

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
        makeVectors(vedic){
                    for(let i = 0; i < vedic.modulus; i++){
                        for(let j = 0; j < vedic.modulus; j++){
                            vector = new Vector(
                                0, 0, 
                                this.canvas.context, 
                                'purple', 
                                vedic.num_table[i][j],
                                5
                            )
                            // console.log(vedic.num_table[i][j])
                            grid.push(vector)
                            console.log(this.grid)
                        }
                    }
                }
    
    activateListeners(){
        this.io.on('connection', (socket) => { 
            socket.on('ready', (data) => {
                socket.emit('ready', vedic)
            });

            socket.on('stream', () => {
                //Node canvas handleStream goes here
            })

            socket.on('incoming', (data) => {
              
            this.makeVectors(vedic)
            this.plotVectors(data, vedic)
            // draw() recursive / highlightNumber
            
            // socket.emit('vectors', grid);
            })
        })
    }
    makeVectors(vedic){
        let vector;
        
        for(let i = 0; i < vedic.modulus; i++){
            for(let j = 0; j < vedic.modulus; j++){
                vector = new Vector(
                    0, 0, 
                    this.canvas.context, 
                    'purple', 
                    vedic.num_table[i][j],
                    5
                )
                // console.log(vedic.num_table[i][j])
                this.grid.push(vector)
            }
        }
    }
    plotVectors(data, vedic){
        let index = 0;
        let stepX = (data.width / vedic.modulus);
        let stepY = (data.height / vedic.modulus);
        for(let x = 0; x <= data.width; x += stepX){               
            for(let y = 0; y <= data.height; y += stepY){
                if(index <= this.grid.length - 1){
                    this.grid[index].x = x;
                    this.grid[index].y = y;
                    index++;
                }     
            }   
        }
    }

}

module.exports = Socket;