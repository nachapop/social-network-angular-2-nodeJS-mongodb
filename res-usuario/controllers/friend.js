'use strict'
var path = require('path')
var fs = require('fs')
var mongoosePaginate = require('mongoose-pagination')
var User = require('../models/user');
var Friend = require('../models/friend');

function res500(res) {
  res.status(500).send({
    mensaje: 'error en la petición'
  })
}

function postFollow(req, res) {
  var friend = new Friend();
  var params = req.body;
  friend.user = params.user;
  friend.friend = params.friend;
  friend.visto = false;
  friend.save((err, follow) => {
    if (err)
      res500(res)
    else {
      if (!follow) {
        res.status(404).send({
          follow: 'No encontrado'
        })
      } else {
        //  postnewFollow(req, res);
        res.status(200).send({
          follow: follow
        })
      }
    }
  })
}



function getAmistades(req, res) {
  var idUser = req.params.id;
  var find = Friend.find({
    'user': idUser
  }).sort('user').populate({
    path: 'friend',
    select: '-password'
  }).exec((err, friend) => {
    if (err)
      res500(res)
    else {
      if (!friend) {
        res.status(404).send({
          friend: 'no hay amigos'
        })
      } else {
        res.status(200).send({
          friend: friend
        })
      }
    }
  })
}

function getNewFollows(req, res) {
  var idFollower = req.params.id;
  Friend.find({
      'friend': idFollower,
      'visto': false
    }).sort('friend')
    .exec((err, follower) => {

      if (err)
        res500(res)
      else {
        if (!follower) {
          res.status(404).send({
            follower: 'no hay amigos'
          })
        } else {
          User.populate(follower, {
            path: 'user',
            select: '-password'
          }, (err, followers) => {
            if (err)
              res500(res)
            else {
              if (!followers) {
                res.status(404).send({
                  friend: 'lista de imagene2'
                })
              } else {
                res.status(200).send({
                  follower: followers
                })


              }
            }
          })
        }
      }
    })
}

function updateFollow(req, res) {
  var idFollow = req.params.id

  var update = {
    visto: true
  }
  Friend.findByIdAndUpdate(idFollow, update, (err, amistadActualizada) => {
    if (err)
      res500(res)
    else {
      if (amistadActualizada) {
        res.status(200).send({
          albums: amistadActualizada
        })
      } else {
        res.status(404).send({
          mensaje: 'NO hay datos'
        })
      }
    }
  })

}

function getFollowers(req, res) {
  var idFollower = req.params.id;
  Friend.find({
      'friend': idFollower
    }).sort('friend')
    .exec((err, follower) => {

      if (err)
        res500(res)
      else {
        if (!follower) {
          res.status(404).send({
            follower: 'no hay amigos'
          })
        } else {
          User.populate(follower, {
            path: 'user',
            select: '-password'
          }, (err, follower) => {
            if (err)
              res500(res)
            else {
              if (!follower) {
                res.status(404).send({
                  friend: 'lista de imagene2'
                })
              } else {
                res.status(200).send({
                  follower: follower
                })
              }
            }
          })
        }
      }
    })
}

function deleteFollow(req, res) {
  var userFriend = req.params.id;

  Friend.findByIdAndRemove(userFriend, (err, friendRemoved) => {
    if (err) {
      res500(res)
    } else {
      if (!friendRemoved) {
        res.status(404).send({
          message: 'El usuario no se puede actualizar'
        })
      } else {
        res.status(200).send({
          friend: friendRemoved
        })
      }
    }
  })
}

function pedirAmistadPost(req, res) {
  var friend = new Friend();
  var params = req.body;
  friend.friend = params.friend;
  friend.enviada = true;
  friend.aceptada = false;
  friend.user = params.user;
  friend.save((err, nuevoAmigo) => {
    if (err)
      res500(res)
    else {
      if (!nuevoAmigo) {
        res.status(404).send({
          message: 'Amigo no encontrado'
        })
      } else {
        friend = new Friend();
        friend.friend = params.user;
        friend.enviada = false;
        friend.aceptada = false;
        friend.user = params.friend;
        friend.save((err, nuevoAmigo2) => {
          if (err)
            res500(res)
          else {
            if (!nuevoAmigo2) {
              res.status(404).send({
                message: 'Amigo no encontrado'
              })
            } else {
              res.status(200).send({
                amigo: nuevoAmigo,
                amigove: nuevoAmigo2
              })
            }
          }
        })

      }
    }
  })
}



function deleteFriendShip(req, res) {
  var frienshipId = req.params.id;

  Friend.findByIdAndRemove(frienshipId, (err, friendshipRemove) => {
    if (err)
      res500(res)
    else {
      if (!friendshipRemove) {
        res.status(404).send({
          imagen: 'Error no se borró la amigo'
        })
      } else {
        res.status(200).send({
          imagenBorrada: friendshipRemove
        })
      }
    }
  })
}


module.exports = {
  pedirAmistadPost,
  getAmistades,
  deleteFriendShip,
  postFollow,
  deleteFollow,
  getFollowers,
  updateFollow,
  getNewFollows
}