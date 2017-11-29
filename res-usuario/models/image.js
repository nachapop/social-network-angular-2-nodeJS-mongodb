'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImageSchema = Schema({
  title: String,
  picture: String,
  album: {
    type: Schema.ObjectId,
    ref: 'Album'
  },
  likes: [String]
});

module.exports = mongoose.model('Image', ImageSchema);