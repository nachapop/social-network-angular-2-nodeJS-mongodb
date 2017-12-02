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
      app.listen(port, () => {
        console.log("Servidor de api rest" + port)
      })


    }
  })





server.listen(8080, function() {
  console.log('Servidor corriendo en http://localhost:8080');
});
io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

  socket.on('add-message', (message) => {
    io.emit('message', {
      type: 'new-message',
      text: message
    });
    // Function above that stores the message in the database
    //  databaseStore(message)
  });

});



// server.listen(5000, () => {
//   console.log('Server started on port 5000');
// });