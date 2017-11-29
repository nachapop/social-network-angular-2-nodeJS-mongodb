'use strict'
var express = require('express');
var ImageController = require('../controllers/image')
var md_auth = require('../middlewares/authenticated')
var api = express.Router();
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart({
  uploadDir: './uploads/images'
})

api.get('/image/:id', md_auth.ensureAuth, ImageController.getImage);
api.get('/images/:album?', md_auth.ensureAuth, ImageController.getImages);
api.post('/image', md_auth.ensureAuth, ImageController.saveImage);
api.put('/image/:id', md_auth.ensureAuth, ImageController.updateImage);
api.delete('/image/:id', md_auth.ensureAuth, ImageController.removeImage);
api.post('/upload-image/:id', [md_auth.ensureAuth, multipartMiddleware], ImageController.uploadImage);
api.get('/get-image/:imageFile', ImageController.getImageFile);
module.exports = api;
