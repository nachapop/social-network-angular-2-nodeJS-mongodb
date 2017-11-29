'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();
var md_auth = require('../middlewares/authenticated')

var multipart = require('connect-multiparty')
var md_upload = multipart({
  uploadDir: './uploads/users'
})
api.delete('/user/:id', UserController.removeUser)
api.get('/checkuser/:name', UserController.getUserByPartOfName)
api.get('/user/:id', md_auth.ensureAuth, UserController.getUser)
api.get('/users/:id', UserController.getUsers)
api.get('/probandon-controlador', md_auth.ensureAuth, UserController.pruebas)
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);
api.post('/upload-image-user/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage);
api.get('/get-image-user/:imageFile', UserController.getImageFile);
module.exports = api;