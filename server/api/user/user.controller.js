'use strict';

var User = require('./user.model');
var Actor = require('../actor/actor.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var _ = require('lodash');
var nodemailer = require('nodemailer');
var async = require('async');
var crypto = require('crypto');
var gmailPassword = process.env.GMAIL_PASSWORD;

var validationError = function(res, err) {
  return res.status(422).json(err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.status(500).send(err);
    res.status(200).json(users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    //create new Actor associated with User
    var newActor = new Actor({ownedBy: user._id, email: user.email})
    newActor.save(function(err, actor){
      //save actorId to currentUser
      var updated = _.merge(user, {actorId: actor._id});
      updated.save(function (err) {
      })
    })

    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresIn: 60*5 });
    res.json({ token: token });
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;
  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.status(401).send('Unauthorized');
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.status(500).send(err);
    return res.status(204).send('No Content');
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.status(200).send('OK');
      });
    } else {
      res.status(403).send('Forbidden');
    }
  });
};

exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  User.findById(req.params.id, function (err, user) {
    if (err) {
        return handleError(res, err); }
    if(!user) { return res.status(404).send('Not Found'); }
    var updated = _.merge(user, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(user);
    });
  });
};
/**
 * Get my info
 */

exports.me = function(req, res, next) {
  var userId = req.user._id;
  User
   .findOne({ _id: userId}, '-salt -hashedPassword')
   .populate('actorId')
   .exec(function(err, user) {
      if(err) { return handleError(res, err); }
      if(!user) { return res.status(401).send('Unauthorized'); }
      return res.json(user);
    });
};

/**
* Reset Password
*/

exports.resetPassword = function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        console.log(token)
        done(err, token);
      });
    },
    function(token, done) {
      console.log(token)
      console.log(req.body.email)
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          console.log(err)
          return err;
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      console.log(gmailPassword)
      var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'hello@castifi.com',
          pass: 'castifi123!'
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'hello@castifi.com',
        subject: 'Castifi Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      transporter.sendMail(mailOptions, function(err) {
        console.log('An e-mail has been sent to ' + user.email + ' with further instructions.');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    // res.redirect('/forgot');
    console.log(err)
  });
};

exports.acceptToken = function(req, res, next){
  console.log(req.body.password)
  console.log(req.params.token)
};


/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
