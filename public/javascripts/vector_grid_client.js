class Grid {
    constructor(width, height, modulus, context, color, num_table, client){
        this.width = width;
        this.height = height;
        this.context = context;
        this.context.strokeStyle = color;
        this.context.fillStyle = 'black';
        this.client = client;

        this.modulus =  modulus;
        this.grid = [];
        this.num_table = num_table;

        this.colors = {
            chromatic: [
                'rgba(60,49,125,1)', 
                'rgba(104,47,129,1)', 
                'rgba(146,29,65,1)', 
                'rgba(223,35,42,1)', 
                'rgba(226,67,41,1)', 
                'rgba(236,136,38,1)', 
                'rgba(240,176,32,1)', 
                'rgba(238,231,57,1)', 
                'rgba(193,214,55,1)', 
                'rgba(89,164,72,1)', 
                'rgba(54,75,153,1)', 
                'rgba(35,127,90,1)', 
            ]
        }
        this.activateListeners();
        this.makeVectorGrid();
        // this.drawGrid();

        
        //Identify neighbors if needed
        // this.findNeighbors();

        //Draw neighbors if needed
        // this.drawNeighbor(this.grid[1])

        //Set color of a specific vector
        // this.grid[2].setColor('red')
        
    }
    makeVectorGrid(){
        /*
        Emit fundamental datasets to Socket.io 
        and make a new Vector on the server

        Data needed:
        width, height, modulus, color,
        digital root, radius 

        re-assign context on the way back

        */
        const width = this.width;
        const height =  this.height;
        let index = 0;
        let vector;

        this.client.socket.emit('incoming', {
            width, height, 
            modulus: this.modulus, 
            context: undefined,
            color: 'black',
            num_table: this.num_table,
            radius: 1
        })
        
        
        // const makeVectors = () => {
        //     for(let i = 0; i < this.modulus; i++){
        //         for(let j = 0; j < this.modulus; j++){
        //             vector = new Vector(
        //                 0, 0, 
        //                 this.width, this.height, 
        //                 this.modulus, this.context, 
        //                 'purple',
        //                 this.num_table[i][j],
        //                 1
        //             );
        //             this.grid.push(vector)
        //         }
        //     }
        // }
   
        // const plotVectors = () => {
        //     let stepX = (this.width / this.modulus);
        //     let stepY = (this.height / this.modulus);
        //     for(let x = 0; x <= this.width; x += stepX){               
        //         for(let y = 0; y <= this.height; y += stepY){
        //             if(index <= this.grid.length - 1){
        //                 this.grid[index].x = x;
        //                 this.grid[index].y = y;
        //                 index++;
        //             }     
        //         }   
        //     }
        // }
        // makeVectors();
        // plotVectors();
    }

//    drawVectorGrid(){
//         for(let i = 0; i < this.grid.length; i++){
//             this.grid[i].setColor('purple')      
//         }
//     }
    drawGrid(){
        let index = 0;
        let reverse = false;
        const draw = () => {
            requestAnimationFrame(() => {
                    // uncomment to animate particle system
                    this.context.fillStyle = 'rgba(255,155,255,0.01)';
                    this.context.fillRect(0,0,this.width,this.height)
                   
                    // this.context.fillStyle = 'white';
                    this.highlightNumber(this.grid[index].dr);
            
            
                // index <= this.modulus - 1 whole square
                // index % this.modulus === 0 single row
                if(index === 0){
                    reverse = false;
                }
                if(!reverse){
                    if(index < this.modulus - 1){
                        // this.context.fillStyle = 'black';
                    // this.context.fillRect(0,0,this.width,this.height)
                    
                        draw();
                        index++;
                    } 
                } 

                if(reverse) {
                    // index = 0;
                    draw();
                    index--;
                }
           
                if(index === this.modulus - 1){
                    this.context.fillStyle = 'white';
                    this.context.fillRect(0,0,this.width,this.height)
                    // this.context.fillStyle = 'purple';
                    reverse = true;
                }   
            });
        }
        draw();
         
    }


    findNeighbors(){
        //TODO: upper and lower neighbors
       for(let i = 0; i < this.grid.length; i++){
            if(i === 0){
                this.grid[i].neighbors.right = this.grid[i + 1];
            } else if(i === this.grid.length - 1){
                this.grid[i].neighbors.left = this.grid[i - 1];
            } else {
                this.grid[i].neighbors.left = this.grid[i - 1];
                this.grid[i].neighbors.right = this.grid[i + 1];
            }
       }
    //    this.drawNeighbor(this.grid[0]);
    }

    drawNeighbor(vector){
        vector.setColor('red')
        if(vector.neighbors.left) {
            let left = vector.neighbors.left;
            left.setColor('purple');
        }
        if(vector.neighbors.right){
            let right = vector.neighbors.right;
            right.setColor('purple')    
        } 
    }

    highlightNumber(number){
        let color;
    //Store number as state in a hash? So we can deselect previous?
        for(let i = 0; i < this.grid.length - this.modulus; i++){
            if(this.grid[i].dr === number){
                color = (this.grid[i].dr % 11);
                color = this.colors.chromatic[color];
                this.context.fillStyle = color;
                this.grid[i].setColor(color)
                // this.context.moveTo(this.grid[i].x, this.grid[i].y)
                // this.context.lineTo(this.grid[i].x, this.grid[i].y)
                // this.context.stroke();
                // this.grid[i].draw()
               
                // this.grid[i].setColor('')
                // this.grid[i].setColor(this.colors.chromatic[color])
            }
        }
    }

    activateListeners(){
        this.client.socket.on('vectors', (data) => {
            console.log('client recieved vector data')
            let new_vector;
            data.forEach((vector, index) => {
                new_vector = new Vector(
                    vector.x, vector.y, 
                    vector.width, vector.height, 
                    vector.modulus, this.context, 
                    vector.color,
                    vector.dr,
                    vector.radius
                   );
               
               this.grid.push(new_vector) 
            })
          
            // console.log(this.grid)
            this.drawGrid();
            //this.grid.makeVectorGrid();
            //this.grid.drawGrid();
        })
    }

}