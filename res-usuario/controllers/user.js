'use strict'
var fs = require('fs')
var path = require('path')
var bcrypt = require('bcrypt-nodejs')
var User = require('../models/user');
var jwt = require('../services/jwt')

function pruebas(req, res) {
  res.status(200).send({
    message: 'Hola pruebas'
  })
}

function res500(res) {
  res.status(500).send({
    mensaje: 'error en la petición'
  })
}

function getUser(req, res) {
  var idUser = req.params.id;
  User.findById(idUser, (err, user) => {
    if (err)
      res500(res)
    else {
      if (user) {
        res.status(200).send({
          user: user
        })
      } else {
        res.status(404).send({
          user: 'NO hay datos'
        })
      }
    }
  })
}

function getUserByPartOfName(req, res) {
  var nameUser = req.params.name;

  User.find({
      $or: [{
          "name": {
            "$regex": nameUser,
            "$options": "i"
          }
        },
        {
          "surname": {
            "$regex": nameUser,
            "$options": "i"
          }
        }
      ]
    },
    function(err, users) {
      if (err)
        res500(res)
      if (!users) {
        res.status(404).send({
          user: 'NO hay datos'
        })
      } else {
        res.status(200).send({
          users: users
        })
      }
    })



}

function getUsers(req, res) {
  var idUser = req.params.id;
  User.find({}, (err, users) => {
    if (err)
      res500(res)
    else {
      if (users) {
        res.status(200).send({
          users: users
        })
      } else {
        res.status(404).send({
          users: 'NO hay datos'
        })
      }
    }
  }).where('_id').ne(idUser)
}

function saveUser(req, res) {
  var user = new User();
  var params = req.body;
  user.name = params.name;
  user.surname = params.surname;
  user.email = params.email;
  user.image = 'null';
  if (params.password) {
    //Ecriptar contraseña y guardar datos
    bcrypt.hash(params.password, null, null, (err, hash) => {
      user.password = hash;
      if (user.name != "" && user.surname != "" && user.email != "") {
        //gudardar ususario
        user.save((err, userPost) => {
          User.on('index', function(err) {})
          if (err)
            res500(res)
          else {
            if (!userPost) {
              res.status(404).send({
                message: 'No se registró correctamente'
              })
            } else {
              res.status(200).send({
                user: userPost
              })
            }
          }
        })
      } else {
        res.status(200).send({
          message: 'Introduce todos los campos'
        })
      }

    })
  } else {
    res500(res)
  }

}


function loginUser(req, res) {
  var params = req.body;
  var email = params.email;
  var password = params.password;

  User.findOne({
    email: email.toLowerCase()
  }, (err, user) => {
    if (err)
      res500(res)
    else {
      if (!user) {
        res.status(404).send({
          message: 'El usuario no existe'
        })
      } else {
        bcrypt.compare(password, user.password, (err, check) => {
          if (err)
            res500(res)
          else {
            if (!check) {
              res.status(404).send({
                message: 'El usuario no existe'
              })
            } else {
              if (params.getHash) {
                //devolver un token de JWT
                res.status(200).send({
                  token: jwt.createToken(user)
                })
              } else {
                res.status(200).send({
                  user
                })
              }
            }
          }
        })
      }
    }
  })
}

function updateUser(req, res) {
  var userId = req.params.id;
  var update = req.body;

  User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
    if (err) {
      res500(res)
    } else {
      if (!userUpdated) {
        res.status(404).send({
          message: 'El usuario no se puede actualizar'
        })
      } else {
        res.status(200).send({
          user: userUpdated
        })
      }
    }
  })
}

function removeUser(req, res) {
  var userId = req.params.id;


  User.findByIdAndRemove(userId, (err, userRemoved) => {
    if (err) {
      res500(res)
    } else {
      if (!userRemoved) {
        res.status(404).send({
          message: 'El usuario no se puede actualizar'
        })
      } else {
        res.status(200).send({
          user: userRemoved
        })
      }
    }
  })
}

function uploadImage(req, res) {
  var userId = req.params.id;
  var file_name = 'No subido...';

  if (req.files) {
    var file_path = req.files.image.path
    var file_split = file_path.split('/');
    var file_name = file_split[2];
    var ext_split = file_name.split('.')
    var file_ext = ext_split[1]

    if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'git') {
      User.findByIdAndUpdate(userId, {
        image: file_name
      }, (err, userUpdated) => {
        if (err) {
          res500(res)
        } else {
          if (!userUpdated) {
            res.status(404).send({
              message: 'El usuario no se puede actualizar'
            })
          } else {
            res.status(200).send({
              image: file_name,
              user: userUpdated
            })
          }
        }

      })
    } else {
      res.status(200).send({
        message: 'Extension de archivo no válida'
      })
    }
  } else {
    res.status(200).send({
      message: 'no has subido ninguna image'
    })
  }
}

function getImageFile(req, res) {
  var imageFile = req.params.imageFile;
  var path_file = './uploads/users/' + imageFile
  fs.exists(path_file, (exists) => {
    if (exists) {
      res.sendFile(path.resolve(path_file));
    } else {
      res.status(200).send({
        message: 'La imagen no existe'
      })
    }
  })
}
module.exports = {
  getUsers,
  pruebas,
  saveUser,
  loginUser,
  updateUser,
  uploadImage,
  getImageFile,
  getUser,
  getUserByPartOfName,
  removeUser
}