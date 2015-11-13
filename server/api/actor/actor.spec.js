'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
// var server = request.agent('http://localhost:9000')
// var user = request.agent(app);

var User = require('../user/user.model');
var server = request.agent('http://localhost:9000');
var token = null
describe('GET /api/actors', function() {

  before(function(done){

    User.find({}).remove(function() {
      User.create({
        provider: 'local',
        email: 'admin@admin.com',
        password: 'admin'
      }, {
        provider: 'local',
        email: 'hello@hello.com',
        password: 'hello'
      }, function() {
          console.log('finished populating users');
          server.post('/auth/local')
            .send({email:'admin@admin.com', password:'admin'})
            .expect(302)
            .end(function(err, res){
              console.error('ERROR ' + JSON.stringify(err));
              console.log('BODY ' + JSON.stringify(res.body));
              token = res.body.token;
              done();
            })
          }
        );
      });
    });

  // afterEach(function(done) {
  //   User.remove().exec().then(function() {
  //     done();
  //   });
  // });

  it('should respond with JSON array', function(done) {
    server.get('/api/actors')
      .set('Authorization', 'Bearer '  + token)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});


// describe('GET /api/actors', function() {

// //   describe('GET /api/getDir', function(){
// //     it('login', loginUser());
// //     it('uri that requires user to be logged in', function(done){
// //     server
// //         .get('/api/getDir')                       
// //         .expect(200)
// //         .end(function(err, res){
// //             if (err) return done(err);
// //             console.log(res.body);
// //             done()
// //         });
// //     });
// // });


//   it('login', loginUser());
//   it('should respond with JSON array', function(done) {
//     server
//       .get('/api/actors')
//       .expect(200)
//       .expect('Content-Type', /json/)
//       .end(function(err, res) {
//         if (err) return done(err);
//         res.body.should.be.instanceof(Array);
//         done();
//       });
//   });
// });


// function loginUser() {
//     return function(done) {
//         server
//             .post('/login')
//             .send({ email: 'admin@admin.com', password: 'admin' })
//             .expect(302)
//             // .expect('Location', '/profile')
//             .end(onResponse);

//         function onResponse(err, res) {
//            if (err) return done(err);
//            return done();
//         }
//     };
// };