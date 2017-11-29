'use strict'

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var app = require('./app');
var port = process.env.PORT || 3000;
var server = require('http').Server(app);
var io = require('socket.io')(server);

mongoose.connect('mongodb://localhost:27017/AEPI_Miwak', {
    useMongoClient: true
  },
  (err, res) => {
    if (err)
      throw err
    else {

      server.listen(8080, function() {
        console.log('Servidor corriendo en http://localhost:8080');
      });

    }
  })


app.listen(port, () => {
  console.log("Servidor de api rest de musica escuchando en el puerto " + port)
})
io.on('connection', function(socket) {
  socket.emit('messages', {
    'nombre': 'nacho',
    'dice': 'hola'
  });


});