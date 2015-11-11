'use strict';

var should = require('should');
var app = require('../../app');
var Actor = require('./actor.model');

var actor = new Actor({
  provider: 'local',
  name: 'Fake Actor',
  email: 'test@test.com',
  password: 'password'
});

describe('Actor Model', function() {
  before(function(done) {
    // Clear actors before testing
    Actor.remove().exec().then(function() {
      done();
    });
  });

  // describe('Validations', function() {
  // 	it('should belong to a user');
  // 	it('should require a valid phone number');
  // });


});
