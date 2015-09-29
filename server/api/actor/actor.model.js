'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ActorSchema = new Schema({
  name: String,

  ownedBy:    {type: mongoose.Schema.Types.ObjectId,
               ref: 'User'
              },

  media:      {imageOne: String, imageTwo: String,
              imageThree: String, video: String
              },

  info:       {unionFirstName: String, unionMiddleName: String,
               unionLastName: String, union: Boolean
              },

  appearance: {height: Number, weight: Number,
               portrayAgeMin: Number, portrayAgeMax: Number,
               ethnicLook: Array, nationality: String,
               complexion: Boolean, eyeColor: String,
               hairColor: String, hairStyle: String,
               hairLength: String,
               facialHair: {present: Boolean, type: String},
               piercing: {present: Boolean, piercingCount: Number,
                          location: String
                         },
               tattos: {hasTattos: Boolean, sleeves: Boolean,
                        visible: Boolean, tattooCountRange: String
                      },
               twins: Boolean, triplets: Boolean, pregnant: String,
               amputee: {present: Boolean, locationOne: String,
                         locationTwo: String, extraInfo: String
                       },
               blind: Boolean, mute: Boolean, deaf: Boolean,
               impairedHearing: Boolean, usesWheelChair: Boolean
              },

  clothingSizes: {men:
                    {coat: String, neck: String, sleeve: String,
                      waist: String, inseam: String, shoes: String,
                      gloveSize: String, hatSize: String
                    },
                 women:
                    {bra: String, waist: String, hips: String,
                      dress: String, pants: String, shoes: String,
                      gloveSize: String, hatSize: String
                    }
                },

  wardrobe:   {basics: {tux: Boolean, fullSuit: Boolean, bathingSuit: Boolean,
                        businessSuit: Boolean, cocktailDress: Boolean,
                        lingerie: Boolean
                       },
               costumes: {doctor: Boolean, emt: Boolean, fireDept: Boolean,
                          nurse: Boolean, paramedic: Boolean, police: Boolean,
                          dragQueen: Boolean, clownSuit: Boolean
                       },

               ethnicClothing: {african: Boolean, arabic: Boolean,
                                chinese: Boolean, eastIndian: Boolean,
                                hasidic: Boolean, japanese: Boolean
                              }
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

  skills:     {aerobic: Boolean, nudity: Boolean,
               partialNudity: Boolean, martialArts: Boolean,
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

  standInExperience: {present: Boolean, pastExperience: String}


});

module.exports = mongoose.model('Actor', ActorSchema);

               // belly: Boolean,
               // brow: Boolean, nose: Boolean, septum: Boolean,
               // ear: Boolean, nipple: Boolean, tongue: Boolean,
               // monroe: Boolean, upperEar: Boolean,
               // snakeBite: Boolean, labret: Boolean

  // hairLength: {hasHair: Boolean, baldTop: Boolean, receding: Boolean,
  //              buzzed: Boolean, shortHair: Boolean, earLength: Boolean,
  //              cheekLength: Boolean, chinLength: Boolean,
  //              shoulderLength: Boolean, midBackLength: Boolean,
  //              hipLength: Boolean, dreadlocks: Boolean,
  //              cornRows: Boolean
  //             },


  // hairColor:  {blonde: Boolean, brown: Boolean,
  //              black: Boolean, grey: Boolean, saltPepper: Boolean,
  //              auburn: Boolean, red: Boolean, white: Boolean,
  //              blue: Boolean, pink: Boolean, green: Boolean
  //             },

  // hairType:   {straight: Boolean, wavy: Boolean, curly: Boolean},
