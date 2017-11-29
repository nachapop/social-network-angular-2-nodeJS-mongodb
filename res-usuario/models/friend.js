'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FriendSchema = Schema({
  user: String,

  friend: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  visto: Boolean
});

module.exports = mongoose.model('Friend', FriendSchema);