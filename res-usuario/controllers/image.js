'use strict'
var User = require('../models/user');
var Album = require('../models/album');
var Image = require('../models/image');
//permite obtener la ruta donde se van a encontrar las imagenes
var path = require('path');
var fs = require('fs')


function res500(res) {
  res.status(500).send({
    mensaje: 'error en la petición'
  })
}

function getImage(req, res) {
  var imageId = req.params.id;
  Image.find({
      imageId
    })
    .populate({
      path: 'album',
      populate: {
        path: 'user',
        model: 'User',
        select: '-password'
      }
    }).exec((err, images) => {
      if (err)
        res500(res)
      else {
        if (!images) {
          res.status(404).send({
            images: 'No se encontró ninguna imagen'
          })
        } else {
          res.status(200).send({
            images: images
          })
        }
      }
    })
}

function getImages(req, res) {
  var idAlbum = req.params.album;
  if (!idAlbum) {
    var find = Image.find({})
  } else {
    var find = Image.find({
      album: idAlbum
    })
  }
  find.populate({
    path: 'album',
    populate: {
      path: 'user',
      model: 'User',
      select: '-password'
    }
  }).exec((err, images) => {
    if (err)
      res500(res)
    else {
      if (!images) {
        res.status(404).send({
          images: 'No se encontró ninguna imagen'
        })
      } else {
        res.status(200).send({
          images: images
        })
      }
    }
  })
}

function saveImage(req, res) {
  var params = req.body;
  var image = Image();
  image.title = params.title;
  image.picture = null;
  image.album = params.album;
  image.save(image, (err, imageNueva) => {
    if (err)
      res500(res)
    else {
      if (!imageNueva) {
        res.status(404).send({
          imagen: 'Error'
        })
      } else {

        res.status(200).send({
          imagen: imageNueva
        })
      }
    }
  })
}

function updateImage(req, res) {
  var imageId = req.params.id;
  var update = req.body;
  Image.findByIdAndUpdate(imageId, update, (err, imageUpdate) => {
    if (err)
      res500(res)
    else {
      if (!imageUpdate) {
        res.status(404).send({
          imagen: 'Error no se actualizo la imagen'
        })
      } else {

        res.status(200).send({
          imagen: imageUpdate
        })
      }
    }
  })
}

function removeImage(req, res) {
  var imageId = req.params.id;

  Image.findByIdAndRemove(imageId, (err, imageRemove) => {
    if (err)
      res500(res)
    else {
      if (!imageRemove) {
        res.status(404).send({
          imagen: 'Error no se borró la imagen'
        })
      } else {
        res.status(200).send({
          imagenBorrada: imageRemove
        })
      }
    }
  })
}

function uploadImage(req, res) {
  var imageId = req.params.id;
  var file_name = 'No subido...';
  if (req.files) {
    var file_path = req.files.image.path;
    var file_split = file_path.split('/');
    var file_name = file_split[2];
    Image.findByIdAndUpdate(imageId, {
      picture: file_name
    }, (err, imageUpdate) => {
      if (err)
        res500(res)
      else {
        if (!imageUpdate) {
          res.status(404).send({
            imagen: 'Error no se actualizo la imagen'
          })
        } else {

          res.status(200).send({
            imagen: imageUpdate
          })
        }
      }
    })
  } else {
    res.status(200).send({
      imagen: 'No se actualizó la imagen'
    })
  }
}


function getImageFile(req, res) {
  var imageFile = req.params.imageFile;
  fs.exists('./uploads/images/' + imageFile, function(exist) {

    if (exist) {
      res.sendFile(path.resolve('./uploads/images/' + imageFile))

    } else {
      res.status(200).send({
        mensaje: 'No exite la imagen'
      })
    }
  })
}
module.exports = {
  getImage,
  getImages,
  saveImage,
  updateImage,
  removeImage,
  uploadImage,
  getImageFile
}