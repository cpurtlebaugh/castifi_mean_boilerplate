/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Actor = require('../api/actor/actor.model');

Actor.find({}).remove(function() {
  Actor.create({
    name: 'booyah',
  }, function() {
      console.log('finished populating actors');
    }
  );
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'test user',
    email: 'test@test.com',
    legalFirstName: 'test',
    legalMiddleName: 'test',
    legalLastName: 'test',
    password: 'test',
    contact: {
            cellNum: 8057548101,
            mainPhoneNum: 8057548101,
            address: '1000 main st',
            aptNum: 105,
            city: 'hollywood',
            state: 'ca',
            zipCode: 90028,
            country: 'united states',
           },
  },
  {
    provider: 'local',
    role: 'admin',
    name: 'admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});



