'use strict';

var should = require('should');
var app = require('../../app');
var Actor = require('./actor.model');
var check = require('./profile.complete.js');

var actor = new Actor({
  email: 'test@test.com',
});

var actorWardrobe = new Actor({
  email: 'test@test.com',
  wardrobe: { tux: true},
  costumes: { doctor: true},
  clothingWomenSizes: { present: true}
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

  describe('Profile Completeness', function() {
      
    it('actor should return a 0 for profileComplete after saving', function(done){
       actor.save(function(err){})
       actor.profileMetrics.profileComplete.should.equal(0);   
       done();   
    });

    it('actorWardrobe should return a 25 for profileComplete after saving', function(done){
       actorWardrobe.profileMetrics.profileComplete = check.checkProfile(actorWardrobe)[4]
       actorWardrobe.save(function(err){})
       // console.log(check.checkProfile(actorWardrobe))
       // console.log( actorWardrobe.profileMetrics.profileComplete)
       // console.log( actorWardrobe.profileMetrics.wardrobeComplete)
       actorWardrobe.profileMetrics.profileComplete.should.equal(25);   
       done();   
    });


  });


});
