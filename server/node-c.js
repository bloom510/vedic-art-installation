/*
    Currently building a server-side version of my client-side
    canvas scripts using node-canvas, a Cairo backed implementation
    of the Canvas API. Data will be streamed to the client.
*/
const Canvas = require('canvas-prebuilt')
const fs = require('fs')

class NodeCanvas{
    constructor(width, height){
        this.global = {}; 
        this.width = width;
        this.height = height;
        this.context;
         

        this.init({
            width: width,
            height: height,
            strokeStyle: 'black',
            fillStyle: 'pink',
            lineCap: 'round',
            lineWidth: 2
        })
 

    }
    init(params){
        this.canvas = new Canvas(params.width, params.height)
        this.context = this.canvas.getContext('2d');        
        this.context.strokeStyle = params.strokeStyle;
        this.context.fillStyle = params.fillStyle;
        this.context.lineCap = params.lineCap;
        this.context.lineWidth = params.lineWidth;

        this.context.fillRect(0, 0, this.width, this.height);
        this.context.fill();

        // console.log(this.canvas.toDataURL())

    }
}

module.exports = NodeCanvas;