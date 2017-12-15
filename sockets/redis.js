const config = require('./config.js'),
  redis = require('redis');

var client = redis.createClient(config.redis_port, config.redis_host);

var promiser = (resolve, reject) => {
  return (err, data) => {
    if (err) reject(err);
    resolve(data);
  };
};
var pushUser = (socketID, user) => {
  return new Promise((resolve, reject) => {
    console.log(user)
    client.sadd('usersConected3', user, promiser(resolve, reject));

  });
}
//redis.lpush('queue', ['1', '2', '3'])
var storeUser = (socketID, user) => {
  return new Promise((resolve, reject) => {
    // client.hset('users', 'user',
    //   user);
    // client.hgetall("users", function(err, user) {
    //   console.log('users', user);
    // });
    client.setex(socketID, config.expire, user, promiser(resolve, reject));
  });
};

var getUser = (socketID) => {
  return new Promise((resolve, reject) => {
    client.get(socketID, promiser(resolve, reject));
    //test errors here
    //  client.get(socketID, 12345, promiser(resolve, reject));
  });
};

var removeUser = (socketID, user) => {

  console.log('removeUser', user)
  return new Promise((resolve, reject) => {
    client.srem("usersConected3", user, promiser(resolve, reject));

    //test errors here
    //  client.get(socketID, 12345, promiser(resolve, reject));
  });
}
module.exports.removeUser = removeUser;
module.exports.storeUser = storeUser;
module.exports.getUser = getUser;
module.exports.pushUser = pushUser;