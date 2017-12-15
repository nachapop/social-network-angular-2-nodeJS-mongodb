const express = require('express'),
  socketio = require('socket.io'),
  redis = require('./redis.js');

var app = express();
var server = app.listen(8080);
var io = socketio(server);



var errorEmit = (socket) => {
  return (err) => {
    console.log(err);
    socket.broadcast.emit('user.events', 'Something went wrong!');
  };
};

io.on('connection', (socket) => {
  socket.on('nameuser', (idUser) => {
    redis.storeUser(socket.id, idUser)
      .then(() => {
        redis.pushUser(socket.id, idUser)
          .then((users) => {
            var namespace = io.of('/user-namespace/' + idUser);
            namespace.emit('event-namespace', 'Connected to Namespace');
          }, errorEmit(socket));
        //this is a different namespace
      }, errorEmit(socket));
  });

  socket.on('disconnect', () => {
    redis.getUser(socket.id)
      .then((user) => {
        if (user === null) return 'Someone'
        else return user
      })
      .then((user) => {
        console.log(user + ' left');
        socket.broadcast.emit('user.events', user + ' left');
        redis.removeUser(socket.id, user)
          .then((user) => {

          }, errorEmit(socket))
      }, errorEmit(socket))
  });
});