'use strict'

var express = require('express');
var FriendController = require('../controllers/friend');
var api = express.Router();
var md_auth = require('../middlewares/authenticated')

api.post('/pedir-amistad', md_auth.ensureAuth, FriendController.pedirAmistadPost)
api.get('/amistades/:id', md_auth.ensureAuth, FriendController.getAmistades)
api.delete('/amistad/:id', md_auth.ensureAuth, FriendController.deleteFriendShip)
// api.get('/friendships/:id1', md_auth.ensureAuth, FriendController.getFriends)
// api.post('/friendship/:id1/:id2', md_auth.ensureAuth, FriendController.saveFriend)
// api.put('/artist/:id', md_auth.ensureAuth, ArtistController.updateArtist)
// api.delete('/artist/:id', md_auth.ensureAuth, ArtistController.deleteArtist)
api.get('/follower/:id', md_auth.ensureAuth, FriendController.getFollowers)
api.get('/newfollower/:id', md_auth.ensureAuth, FriendController.getNewFollows)
api.put('/newfollower/:id', md_auth.ensureAuth, FriendController.updateFollow)
api.post('/follow', md_auth.ensureAuth, FriendController.postFollow)
api.delete('/follow/:id', md_auth.ensureAuth, FriendController.deleteFollow)
module.exports = api;