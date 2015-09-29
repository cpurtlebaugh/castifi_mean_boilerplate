'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ActorSchema = new Schema({
  name: String,

  ownedBy:    {
               type: mongoose.Schema.Types.ObjectId,
               ref: 'User'
              },

  media:      {imageOne: String, imageTwo: String,
              imageThree: String, video: String
              },

  info:       {unionFirstName: String, unionMiddleName: String,
               unionLastName: String, union: Boolean,
               nudity: Boolean
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

  property:   {hasVehicle: Boolean,
                vehicleOne: {vehicleOneMake: String, vehicleOneYear: String,
                 vehicleOneColor: String},
                vehicleTwo: {vehicleTwoMake: String, vehicleTwoYear: String,
                 color: String},
              hasPet: Boolean,
                petOne: {petOneType: String, petOneColor: String, petOneLicense: String},
                petTwo: {petTwoType: String, petTwoColor: String, petTwoLicense: String},
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

  looks:      {bodyBuilder: Boolean,
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

module.exports = mongoose.model('Actor', ActorSchema);
