class Grid {
    constructor(width, height, modulus, context, color, num_table, client, hiddenContext){
        this.width = width;
        this.height = height;
        this.context = context;
        this.context.strokeStyle = color;
        this.hiddenContext = hiddenContext;
        this.context.fillStyle = 'black';
        this.client = client;

        this.modulus =  modulus;
        this.grid = [];
        this.num_table = num_table;

        // this.activateListeners();
        this.makeVectorGrid();
        this.drawGrid();
        
    }
    makeVectorGrid(){
        const width = this.width;
        const height =  this.height;
        let index = 0;
        let vector;

        // this.client.socket.emit('incoming', {
        //     width, height, 
        //     modulus: this.modulus, 
        //     context: undefined,
        //     color: 'black',
        //     num_table: this.num_table,
        //     radius: 1
        // })
        
        
        const makeVectors = () => {
            for(let i = 0; i < this.modulus; i++){
                for(let j = 0; j < this.modulus; j++){
                    vector = new Vector(
                        0, 0, 
                        this.width, this.height, 
                        this.modulus, this.context, 
                        'purple',
                        this.num_table[i][j],
                        1,
                        this.hiddenContext
                    );
                    this.grid.push(vector)
                }
            }
        }
   
        const plotVectors = () => {
            let stepX = (this.width / this.modulus);
            let stepY = (this.height / this.modulus);
            for(let x = 0; x <= this.width; x += stepX){               
                for(let y = 0; y <= this.height; y += stepY){
                    if(index <= this.grid.length - 1){
                        this.grid[index].x = Math.floor(x);
                        this.grid[index].y = Math.floor(y);
                        index++;
                    }     
                }   
            }
        }
        makeVectors();
        plotVectors();
    }

 
    drawGrid(){
        let index = 0;
        let reverse = false;
        const draw = () => {
            requestAnimationFrame(() => {
                this.hiddenContext.fill();
                this.highlightNumber(this.grid[index].dr, reverse);
                
                // index <= this.modulus - 1 whole square
                // index % this.modulus === 0 single row
                if(index === 0){
                    reverse = false;
                }
                if(index === this.modulus - 1){
                    reverse = true;
                }  

                if(!reverse){
                    if(index < this.modulus - 1){
                        draw();
                        index++;
                    } 
                } 

                if(reverse) {
                    draw();
                    index--;
                }
                // this.context.drawImage(document.getElementById('hiddenCanvas'), 0, 0);
                 // cut the drawn rectangle
                 var image = this.hiddenContext.getImageData(0,0,this.width,this.height); 
                 // copy into visual canvas at different position
                 this.context.putImageData(image, 0, 0);
                 
               
            });
        }
        draw();
         
    }


    // findNeighbors(){
    //    for(let i = 0; i < this.grid.length; i++){
    //         if(i === 0){
    //             this.grid[i].neighbors.right = this.grid[i + 1];
    //         } else if(i === this.grid.length - 1){
    //             this.grid[i].neighbors.left = this.grid[i - 1];
    //         } else {
    //             this.grid[i].neighbors.left = this.grid[i - 1];
    //             this.grid[i].neighbors.right = this.grid[i + 1];
    //         }
    //    }
   
    // }

    // drawNeighbor(vector){
    //     vector.setColor('red')
    //     if(vector.neighbors.left) {
    //         let left = vector.neighbors.left;
    //         left.setColor('purple');
    //     }
    //     if(vector.neighbors.right){
    //         let right = vector.neighbors.right;
    //         right.setColor('purple')    
    //     } 
    // }

    highlightNumber(number, hide){
        
        this.grid.filter((i, n) => {
            if(i.dr === number) {
                
                !hide ?  i.setColor('black'): i.setColor('white')

               
                   
                 

                
            } 
        })

    }

    activateListeners(){
        this.client.socket.on('vectors', (data) => {
            console.log('client recieved vector data')
            let new_vector;
            data.forEach((vector) => {
                new_vector = new Vector(
                    vector.x, vector.y, 
                    vector.width, vector.height, 
                    vector.modulus, this.context, 
                    vector.color,
                    vector.dr,
                    vector.radius,
                    this.hiddenContext
                   );
               
               this.grid.push(new_vector) 
            })
          
            this.drawGrid();

        })
    }

}