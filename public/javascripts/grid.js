class Grid {
    constructor(width, height, modulus, context, color, num_table){
        this.modulus =  modulus;
        this.windowWidth = width;
        this.windowHeight = height;
        this.context = context;
        this.context.strokeStyle = color;
        this.context.fillStyle = 'black';
        this.grid = [];
        this.num_table = num_table;

        this.makeVectorGrid();
        //Draws the entire grid
        // this.drawVectorGrid();
        //Highlights a specific number
        this.highlightNumber(this.grid[0].dr)
     
        this.drawSequence(0);

        
        //Finds neighbors if needed
        // this.findNeighbors();
        //Draws neighbors 
        // this.drawNeighbor(this.grid[1])
        //Set color to a specific vector
        // this.grid[2].setColor('red')
        
    }
    makeVectorGrid(){
        const width = this.windowWidth / this.modulus;
        const height =  this.windowHeight / this.modulus;
        let index = 0;
        let vector;
        
        const makeVectors = () => {
            for(let i = 0; i < this.modulus; i++){
                for(let j = 0; j < this.modulus; j++){
                    vector = new Vector(
                        0, 0, 
                        this.windowWidth, this.windowHeight, 
                        this.modulus, this.context, 
                        'purple',
                        this.num_table[i][j],
                        0.7
                    );
                    this.grid.push(vector)
                }
            }
        }
   
        const plotVectors = () => {
            let stepX = (this.windowWidth / this.modulus);
            let stepY = (this.windowHeight / this.modulus);
            for(let x = 0; x <= this.windowWidth; x += stepX){               
                for(let y = 0; y <= this.windowHeight; y += stepY){
                    if(index <= this.grid.length - 1){
                        this.grid[index].x = x;
                        this.grid[index].y = y;
                        index++;
                    }     
                }   
            }
        }
        makeVectors();
        plotVectors();
        // console.log(this.grid);
    }

   drawVectorGrid(){
        for(let i = 0; i < this.grid.length; i++){
            this.grid[i].setColor('purple')      
        }
    }
    drawSequence(index){
        let initIndex = index;
        let reverse = false;
        const draw = () => {
            requestAnimationFrame(() => {
            this.highlightNumber(this.grid[index].dr);
                // index <= this.modulus - 1 whole square
                //index % this.modulus === 0 single row
                if(index === 0){
                    this.context.fillStyle = 'white';
                    this.context.fillRect(0,0,this.windowWidth,this.windowHeight)
                    reverse = false;
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
           
                if(index === this.modulus - 1){
                    this.context.fillStyle = 'white';
                    this.context.fillRect(0,0,this.windowWidth,this.windowHeight)
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
    //Store number as state in a hash? So we can deselect previous?
        for(let i = 0; i < this.grid.length - this.modulus; i++){
            if(this.grid[i].dr === number){
                if(i === 0){
                    // this.context.moveTo(this.grid[i].x, this.grid[i].y)
                } else if(i % 1 === 0){
                    // this.context.lineTo(this.grid[i].x, this.grid[i].y)
                    
                }
                // this.context.stroke();
                this.grid[i].setColor('black')
            }
        }
    }

}