
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
            socket.on('ready', (data) => {
                socket.emit('ready', vedic)
            });

            socket.on('incoming', (data) => {
                let grid = [];
                let vector;
                let index = 0;
                
                const makeVectors = () => {
                    for(let i = 0; i < data.modulus; i++){
                        for(let j = 0; j < data.modulus; j++){
                            let vector = {
                                x: 0, y: 0, 
                                width: data.width, height:data.height, 
                                modulus: data.modulus, 
                                context: data.context, 
                                color: data.color,
                                dr: data.num_table[i][j],
                                radius: data.radius
                            }
                            grid.push(vector)
                        }
                    }
                }

                const plotVectors = () => {
                    let stepX = (data.width / data.modulus);
                    let stepY = (data.height / data.modulus);
                    for(let x = 0; x <= data.width; x += stepX){               
                        for(let y = 0; y <= data.height; y += stepY){
                            if(index <= grid.length - 1){
                                grid[index].x = x;
                                grid[index].y = y;
                                index++;
                            }     
                        }   
                    }
                }

                makeVectors()
                plotVectors()

                socket.emit('vectors', grid);
            })
        })
    }

}

module.exports = Socket;