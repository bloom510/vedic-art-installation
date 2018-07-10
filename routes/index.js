const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { 
    title: 'Express', scripts: 
      [
        {script: '../javascripts/playback.js'},
         //Business logic
         {script: '../javascripts/canvas.js'},
        //Socket.io 
        {script: '/socket.io/socket.io.js'},
        {script: '../javascripts/client.js'},
        //Tone.js
        {script: 'https://cdnjs.cloudflare.com/ajax/libs/tone/13.2.0/Tone.js'}
        //jQuery
        // {script: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js'},
        
       
      ]
  }); 
});

module.exports = router;
