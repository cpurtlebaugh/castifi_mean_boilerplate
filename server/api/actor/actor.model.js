'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//need to add createdAt and updatedAt
//also createdBy    

var ActorSchema = new Schema({
  name: String,
  legalFirstName: {type: String, lowercase: true},
  legalMiddleName: {type: String, lowercase: true},
  legalLastName: {type: String, lowercase: true},
  gender: String,
  dob: Date,
  contact: {
            cellNum: {type: String,
              validate: {
                validator: function(cellNum){
                  return cellNum.length === 10;
                },
              message: 'cell number needs to be exactly 10 characters'
              }
            },

            mainPhoneNum: {type: String,
              validate: {
                validator: function(mainPhoneNum){
                  return mainPhoneNum.length === 10;
                },
              message: 'phone number needs to be exactly 10 characters'
              }
             },
            address: {type: String, lowercase: true},
            aptNum: Number,
            city: {type: String, lowercase: true},
            state: {type: String, lowercase: true},
            zipCode: Number,
            country: {type: String, lowercase: true},
           },

  ownedBy:    {type: mongoose.Schema.Types.ObjectId,
               ref: 'User'
              },

  media:      {imageOne: String, imageTwo: String,
              imageThree: String, video: String
              },

  info:       {unionFirstName: String, unionMiddleName: String,
               unionLastName: String, union: Boolean, bio: String
              },

// appearance //
  ethnicLook: {
                caucasian: Boolean, africanAmerican: Boolean,
                nativeAmerican: Boolean, pacificIslander: Boolean,
                asian: Boolean, easternIndian: Boolean,
                middleEastern: Boolean, hispanic: Boolean
               },

  appearance: {heightFeet: Number, heightInches:Number, weight: Number,
               portrayAgeMin: Number, portrayAgeMax: Number,
               nationality: String, bodyType: String, complexion: String,
               eyeColor: String, hairColor: String,
               hairStyle: String, hairLength: String,
               facialHairType:String, twins: Boolean,
               triplets: Boolean, pregnant: Boolean,
               pregnantDueDate: Date, smoker:Boolean
              },

  piercings:  {present: Boolean, piercingCount: Number,
               ear:Boolean, nose:Boolean, eyebrow: Boolean,
               lip: Boolean, tongue: Boolean, navel:Boolean
              },

  tattoos:    {
               present: Boolean, tattooCountRange: String,
               forearm: Boolean, upperArm:Boolean, neck:Boolean,
               face: Boolean, chest: Boolean, stomach: Boolean,
               back: Boolean, hand: Boolean, leg: Boolean, foot: Boolean
              },

  willing:    {
                partialNudity: Boolean, fullNudity: Boolean,
                kissing: Boolean, kissingSameSex: Boolean,
                drag: Boolean, cutHair: Boolean, colorHair: Boolean,
                eatMeat: Boolean
              },

  amputee:    {
               present: Boolean, hand: Boolean, foot: Boolean,
               arm: Boolean, leg: Boolean, finger: Boolean
              },

  disabled:   {
              present:Boolean, blind: Boolean, mute: Boolean, deaf: Boolean,
              impairedHearing: Boolean, usesWheelChair: Boolean
              },

  clothingMenSizes: { 
                      coatLength: String,
                      coatSize: String, 
                      shirtNeck: String, 
                      shirtSleeve: String,
                      pantWaist: String, 
                      pantInseam: String, 
                      shoe: String,
                      glove: String, 
                      hat: String
                    },

  clothingWomenSizes: {  
                        bustSize: String,
                        cupSize: String, 
                        pantWaist: String, 
                        pantInseam: String,
                        hips: String,
                        dress: String, 
                        shoe: String,
                        glove: String, 
                        hat: String
                    },

  wardrobe:   {tux: Boolean, fullSuit: Boolean, bathingSuit: Boolean,
               businessSuit: Boolean, cocktailDress: Boolean,
               lingerie: Boolean
              },

  costumes:   {doctor: Boolean, emt: Boolean, fireDept: Boolean,
               nurse: Boolean, paramedic: Boolean, police: Boolean,
               dragQueen: Boolean, clownSuit: Boolean
              },

  ethnicClothing: {african: Boolean, arabic: Boolean,
                   chinese: Boolean, eastIndian: Boolean,
                   hasidic: Boolean, japanese: Boolean
                  },


  looks:      {bodyBuilder: Boolean,
               business: Boolean, character: Boolean,
               dragQueen: Boolean, freckles: Boolean,
               punk: Boolean, multiplePiercings: Boolean
              },

  property:   {hasVehicle: Boolean,
                vehicleOne: {vehicleOneMake: String, vehicleOneYear: String,
                             vehicleOneColor: String},
                vehicleTwo: {vehicleTwoMake: String, vehicleTwoYear: String,
                             vehicleTwoColor: String},
              hasPet: Boolean,
                petOne: {petOneType: String, petOneColor: String,
                          petOneLicense: String},
                petTwo: {petTwoType: String, petTwoColor: String,
                          petTwoLicense: String}
              },

  skills:     {aerobic: Boolean, martialArts: Boolean,
               martialArtsWeapon: Boolean, militaryTraining: Boolean,
               stageCombat: Boolean, generalWeaponsTraining: Boolean,
               artist: Boolean, ballonSculpting: Boolean,
               bartender: Boolean, batonTwirler: Boolean,
               caligraphyArtist: Boolean, cardDealer: Boolean,
               cheerleader: Boolean, contortionist: Boolean,
               fireBreather: Boolean, fireEater: Boolean,
               fireman: Boolean, gunHandler: Boolean,
               juggler: Boolean, lifeguard: Boolean,
               magician: Boolean, manicurist: Boolean,
               massage: Boolean, mime: Boolean, footModel: Boolean,
               handModel: Boolean, legModel: Boolean, nurse: Boolean,
               paramedic: Boolean, signLanguage: Boolean,
               sketchArtist: Boolean, stenographer: Boolean,
               stiltwalker: Boolean, unicyclist: Boolean,
               welder: Boolean, yoga: Boolean, circus: Boolean,
               improve: Boolean, horseRiding: Boolean,
               canDrive: Boolean, stunts: Boolean
              },

  sports:     {basketball: Boolean, baseball: Boolean,
               soccer: Boolean, skateBoarding: Boolean,
               swimming: Boolean, cycling: Boolean,
               trackField: Boolean, football: Boolean,
               running: Boolean, hockey: Boolean,
               tennis: Boolean, tableTennis: Boolean,
               rollerskating: Boolean
              },

  music:      {guitar: Boolean, bass: Boolean, drums: Boolean,
               horns: Boolean, saxaphone: Boolean, keys: Boolean,
               dj: Boolean, banjo: Boolean, harmonica: Boolean,
               violin: Boolean,
               canSing: {sporano: Boolean, alto: Boolean, tenor: Boolean,
                        baritone: Boolean}
              },

  dance:      {ballet: Boolean, salsa: Boolean, ballroom: Boolean,
               swing: Boolean, hipHop: Boolean, flamingo: Boolean,
               contemporary: Boolean, tapDance: Boolean,
               irishDance: Boolean, bellyDance: Boolean,
               bollyWood: Boolean, breakDance: Boolean,
               eastCoastSwing: Boolean, westCoastSwing: Boolean,
               tango: Boolean, bachata: Boolean, kizomba: Boolean,
               argentinetango: Boolean
              },

  setCoordinator: {present: Boolean, pastExperience: String},

  standInExperience: {present: Boolean, pastExperience: String},

  createdAt: {type: Date, default: Date.now()}

});

module.exports = mongoose.model('Actor', ActorSchema);
