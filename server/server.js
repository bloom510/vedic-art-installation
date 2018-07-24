
const express = require('express');
const Socket = require('./socket.js')

class Server{
  constructor(){
    this.app = express();
    this.PORT = process.env.PORT || 8080;
    this.socket = new Socket(this.app, this.PORT)
    this.setup(this.app)
  }
  setup(app){
    const path = require('path');
    const bodyParser = require("body-parser");
   
    this.app.set('views', path.join(__dirname, '../views'));
    this.app.set('view engine', 'hbs');

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static(path.join(__dirname, '../public')));
    this.app.use(bodyParser.urlencoded({ extended: true }));

    const indexRouter = require('../routes/index');
    this.app.use('/', indexRouter);
  }
}

const server = new Server();
module.exports = server;