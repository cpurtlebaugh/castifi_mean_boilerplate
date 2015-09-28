'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var authTypes = ['github', 'twitter', 'facebook', 'google'];

// var UserSchema = new Schema({
//   name: String,
//   email: { type: String, lowercase: true },
//   role: {
//     type: String,
//     default: 'user'
//   },
//   hashedPassword: String,
//   provider: String,
//   salt: String,
//   facebook: {},
//   google: {},
//   github: {}
// });

var UserSchema = new Schema({
  name: String,
  email: { type: String, lowercase: true },
  role: {
    type: String,
    default: 'user'
  },
  hashedPassword: String,
  provider: String,
  salt: String,
  facebook: {},
  google: {},
  github: {},
  info:      {legalFirstName: String, legalMiddleName: String,
              legalLastName: String, unionFirstName: String,
              unionMiddleName: String, unionLastName: String,
              dob: Date, gender: String, union: Boolean,
              nudity: Boolean
             },

  contact:   {cell: Number, homeNum: Number, address: String,
              aptNum: String, city: String, state: String,
              zipCode: Number, emergencyFirstName: String,
              emergencyNum: Number
             },

  appearance: {height: Number, weight: Number,
               portrayAgeMin: Number, ethnicLook: Array,
               portrayAgeMax: Number, eyeColor: String,
               hairColor: String, hairStyle: String,
               facialHair: {present: Boolean, type: String},
               piercing: {present: Boolean, belly: Boolean,
                brow: Boolean, nose: Boolean, septum: Boolean,
                ear: Boolean, nipple: Boolean, tongue: Boolean,
                monroe: Boolean, upperEar: Boolean,
                snakeBite: Boolean, labret: Boolean}
              },

  measurements: {men:
                    {coat: String, neck: String, sleeve: String,
                      waist: String, inseam: String, shoes: String},
                 women:
                    {bra: String, waist: String, hips: String,
                      dress: String, pants: String, shoes: String}
              },

  property:   {vehicle1: {present: Boolean, make: String, year: String,
               color: String},
               vehicle2: {present: Boolean, make: String, year: String,
               color: String},
               pets: {present: Boolean, type: Array},
              },

  skills:     {hasSkills: Boolean, aerobic: Boolean,
               artist: Boolean, ballonSculpting: Boolean,
               bartender: Boolean, batonTwirler: Boolean,
               caligraphyArtist: Boolean, cardDealer: Boolean,
               cheerleader: Boolean, contortionist: Boolean,
               fireBreather: Boolean, fireEater: Boolean,
               fireman: Boolean, gunHandler: Boolean,
               juggler: Boolean, lifeguard: Boolean,
               magician: Boolean, manicurist: Boolean,
               massage: Boolean, militaryTraining: Boolean,
               mime: Boolean, footModel: Boolean,
               handModel: Boolean, legModel: Boolean, nurse: Boolean,
               paramedic: Boolean, signLanguage: Boolean,
               sketchArtist: Boolean, stenographer: Boolean,
               stiltwalker: Boolean, unicyclist: Boolean,
               welder: Boolean, yoga: Boolean
              },

  looks:      {looksUnder18: Boolean, bodyBuilder: Boolean,
               business: Boolean, character: Boolean,
               dragQueen: Boolean, freckles: Boolean,
               punk: Boolean, multiplePiercings: Boolean,
               tattos: {present: Boolean, sleeves: Boolean,
                        visible: Boolean},
               amputee: {present: Boolean, location: String},
               twins: Boolean, triplets: Boolean, upscale: Boolean,
               wheelChairUser: Boolean
              },

  sports:     {basketball: Boolean, baseball: Boolean,
               soccer: Boolean, karate: Boolean,
               skateBoarding: Boolean, swimming: Boolean,
               football: Boolean, running: Boolean,
               hockey: Boolean, tennis: Boolean,
               tableTennis: Boolean,
              },

  music:      {guitar: Boolean, bass: Boolean, drums: Boolean,
               horns: Boolean, saxaphone: Boolean, keys: Boolean,
               dj: Boolean, banjo: Boolean, harmonica: Boolean,
               violin: Boolean,
              },

  dance:      {ballet: Boolean, salsa: Boolean, ballroom: Boolean,
               swing: Boolean, hipHop: Boolean, flamingo: Boolean,
               contemporary: Boolean, tapDance: Boolean,
               irishDance: Boolean, bellyDance: Boolean,
               bollyWood: Boolean, breakDance: Boolean
              },

  costumes:   {formalWear: Boolean, casual: Boolean},

  setCoordinator: {present: Boolean, pastExperience: String},

  standInExperience: {present: Boolean, pastExperience: String}

});

/**
 * Virtuals
 */
UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

// Public profile information
UserSchema
  .virtual('profile')
  .get(function() {
    return {
      'name': this.name,
      'role': this.role
    };
  });

// Non-sensitive info we'll be putting in the token
UserSchema
  .virtual('token')
  .get(function() {
    return {
      '_id': this._id,
      'role': this.role
    };
  });

/**
 * Validations
 */

// Validate empty email
UserSchema
  .path('email')
  .validate(function(email) {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return email.length;
  }, 'Email cannot be blank');

// Validate empty password
UserSchema
  .path('hashedPassword')
  .validate(function(hashedPassword) {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return hashedPassword.length;
  }, 'Password cannot be blank');

// Validate email is not taken
UserSchema
  .path('email')
  .validate(function(value, respond) {
    var self = this;
    this.constructor.findOne({email: value}, function(err, user) {
      if(err) throw err;
      if(user) {
        if(self.id === user.id) return respond(true);
        return respond(false);
      }
      respond(true);
    });
}, 'The specified email address is already in use.');

var validatePresenceOf = function(value) {
  return value && value.length;
};

/**
 * Pre-save hook
 */
UserSchema
  .pre('save', function(next) {
    if (!this.isNew) return next();

    if (!validatePresenceOf(this.hashedPassword) && authTypes.indexOf(this.provider) === -1)
      next(new Error('Invalid password'));
    else
      next();
  });

/**
 * Methods
 */
UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword: function(password) {
    if (!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }
};

module.exports = mongoose.model('User', UserSchema);
