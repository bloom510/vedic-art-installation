const fs = require('fs')
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { 
    title: 'Express', scripts: 
      [
        //Socket.io 
        {script: '/socket.io/socket.io.js'},
        {script: '../javascripts/client.js'},
        //Tone.js
        // {script: 'https://cdnjs.cloudflare.com/ajax/libs/tone/13.2.0/Tone.js'},
        //Business logic
        {script: '../javascripts/vector.js'},
        {script: '../javascripts/grid.js'},
        {script: '../javascripts/sequence.js'},
        {script: '../javascripts/canvas.js'},
      ]
  }); 
});

router.get('/show', function (req, res, next) {
  res.render('index', { 
    title: 'Express', scripts: 
      [
        {script: '/socket.io/socket.io.js'},
        {script: '../javascripts/node-client.js'},
        {script: '../javascripts/canvas.js'},
      ]
  });
  // res.setHeader('Content-Type', 'image/png');
  // let stream = this.canvas.canvas.createPNGStream();
  // stream.pipe(res)
});

module.exports = router;

// res.setHeader('Content-Type', 'image/png');
// const out = fs.createWriteStream(__dirname + '/state.png')

// let stream = NodeCanvas.canvas.pngStream().pipe(out);
// stream.on('data', (chunk) => {
//   out.write(chunk);
// });
