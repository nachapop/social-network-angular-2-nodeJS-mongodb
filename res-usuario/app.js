'use strict'
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var user_api = require('./routes/user');
var friend_api = require('./routes/friend');
var album_api = require('./routes/album');
var image_api = require('./routes/image');
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json());
//cualquiera puede hacer peticiones a nuestro apirest
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  //los headers que le pueden llegar
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

  next();
});
app.use('/api', user_api);
app.use('/api', friend_api);
app.use('/api', album_api);
app.use('/api', image_api);


module.exports = app;