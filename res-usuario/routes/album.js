'use strict'
var express = require('express');
var AlbumController = require('../controllers/album')
var md_auth = require('../middlewares/authenticated')
var api = express.Router();

api.get('/album/:id/:user', md_auth.ensureAuth, AlbumController.getAlbum);
api.get('/albums/:user', md_auth.ensureAuth, AlbumController.getAlbums);
api.post('/album', md_auth.ensureAuth, AlbumController.saveAlbum);
api.put('/album/:id', md_auth.ensureAuth, AlbumController.updateAlbum);
api.delete('/album/:id', md_auth.ensureAuth, AlbumController.deleteAlbum);
module.exports = api;