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
        {script: 'https://cdnjs.cloudflare.com/ajax/libs/tone/13.2.0/Tone.js'},
        //Business logic
        {script: '../javascripts/vector.js'},
        {script: '../javascripts/sequence.js'},
        {script: '../javascripts/grid.js'},
        {script: '../javascripts/canvas.js'},
      ]
  }); 
});

module.exports = router;
