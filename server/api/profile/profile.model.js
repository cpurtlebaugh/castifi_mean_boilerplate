'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProfileSchema = new Schema({
  name: String,
  email: String,
  info: String,
  active: Boolean,
  user: Object
});

module.exports = mongoose.model('Profile', ProfileSchema);