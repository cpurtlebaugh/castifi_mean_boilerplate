'use strict';

var should = require('should');
var app = require('../../app');
var Actor = require('./actor.model');

var actor = new Actor({
  email: 'test@test.com',
});

describe('Actor Model', function() {
  
  afterEach(function(done) {
    Actor.remove().exec().then(function() {
      done();
    });
  });

  describe('Validations', function() {
  	it('cellNum should fail without a valid 10-digit phone number', function(done){
       actor.contact.cellNum = '18002224444';
       actor.save(function(err){
         should.exist(err);
         done();
       })
    });

    it('mainNum should fail without a valid 10-digit phone number', function(done){
       actor.contact.mainPhoneNum = '800222444';
       actor.save(function(err){
         should.exist(err);
         done();
       })
    });
  
  });


});
