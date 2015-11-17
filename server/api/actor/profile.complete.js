'use strict';

var mongoose = require('mongoose');
var Actor = require('./actor.model');

function checkProfile(actor){
	console.log(actor)
	console.log("hello world")
	return actor.email
}

exports.checkProfile = checkProfile;