'use strict';

var mongoose = require('mongoose');
var Actor    = require('./actor.model');
var _        = require('lodash');
var async    = require('async');


function checkWardrobe(actor){
  var wardrobeTotal,
      uniformTotal,
      measureTotal,
      basicTotal,
      testTotal;

   //basic wardrobe
   var wardrobe = [actor.wardrobe.tux,
    actor.wardrobe.fullSuit, actor.wardrobe.bathingSuit,
    actor.wardrobe.businessSuit, actor.wardrobe.cocktailDress,
    actor.wardrobe.lingerie]

   var basicWardrobe =  _.some(wardrobe, function(value){
                            return value === true;
                          })

    basicWardrobe ? basicTotal = 8.5 : basicTotal = 0;

    //costume/uniform wardrobe
    var costumes = [actor.costumes.doctor, actor.costumes.emt, actor.costumes.fireDept,
                    actor.costumes.nurse, actor.costumes.paramedic, actor.costumes.police,
                    actor.costumes.dragQueen, actor.costumes.clownSuit ]

     var costumeWardrobe =  _.some(costumes, function(value){
                                return value === true;
                            })

    costumeWardrobe ? uniformTotal = 8.25 : uniformTotal = 0;

    //clothingSizes wardrobe, need to add a check on individual clothing fields
    actor.clothingWomenSizes.present || actor.clothingMenSizes.present ?  measureTotal = 8.25 : measureTotal = 0;


    wardrobeTotal = basicTotal + measureTotal + uniformTotal;
    wardrobeTotal = Math.floor(wardrobeTotal);

    //console logs
    // console.log("basicTotal");
    // console.log(basicTotal);
    // console.log("uniformTotal")
    // console.log(uniformTotal)
    // console.log("measureTotal");
    // console.log(measureTotal);
    // console.log("wardrobeTotal");
    // console.log(wardrobeTotal);

    return wardrobeTotal;
  }

function checkOverview(actor){

// total metric to equal 25 pts
  var requiredTotal,
      willingTotal,
      quoteTotal,
      unionTotal,
      newActorTotal,
      eligibleTotal,
      overviewTotal;

  // required: 6.25 pts
  var requiredArray = [actor.legalFirstName, actor.legalLastName, actor.overEighteen,
                       actor.contact.mainPhoneNum, actor.contact.fullAddress];

  _.forEach(requiredArray, function(value){
    (value === undefined)? requiredTotal = 0 : requiredTotal = 6.25;
  })

      // console.log('required total')
      // console.log(requiredTotal)

  // willing: 12.5 pts

  var willing = [actor.willing.partialNudity, actor.willing.fullNudity,
                           actor.willing.kissing, actor.willing.eatMeat,
                           actor.willing.travel, actor.willing.colorHair,
                           actor.willing.cutHair, actor.willing.kissingSameSex]

  var actorWilling =  _.some(willing, function(value){
                        return value === true;
                      })

  actorWilling ? willingTotal = 3.125 : willingTotal = 0;
  // _.some(actor.willing, function(value){
  //   // console.log(value === true)

  //   (value === (true || false))? willingTotal = 3.125 : willingTotal = 0;
  // })

      // console.log('willing')
      // console.log(willingTotal)

// console.log( _.some([null, 0, 'yes'], Boolean));
// var users = [
//   { 'user': 'barney', 'active': true },
//   { 'user': 'fred',   'active': false }
// ];

// using the `_.matches` callback shorthand
// console.log("bip")
// console.log(_.some([actor.willing], { 'colorHair': true }));
// var tesssst = _.some([actor.willing], { 'colorHair': true });
// console.log(tesssst)
// → false
// var test2 = _.some(actor.willing, t)
// console.log(test2)
  // var test = _.some(actor.willing, key, true)

  // test? willingTotal = 3.125 : willingTotal = 0;

  // console.log(test);
  // console.log(willingTotal);

  // Quote: 12.5pts
  actor.info.movieQuote !== undefined ? (actor.info.movieQuote.length < 1 ? quoteTotal = 0 : quoteTotal = 3.125) :  quoteTotal = 0;
      // console.log('quote')
      // console.log(quoteTotal)

  // SAG or Non-Union: 17 pts
  actor.info.union !== undefined ? unionTotal = 4.25 : unionTotal = 0;
      // console.log('union')
      // console.log(unionTotal)

  // newActor: 16 pts
  actor.info.newActor !== undefined ? newActorTotal = 4 : newActorTotal = 0;
      // console.log('newActor')
      // console.log(newActorTotal)

  // sagEligible: 17pts
  actor.info.sagEligible !== undefined ? eligibleTotal = 4.25 : eligibleTotal = 0;
    // console.log('sag eligible')
    // console.log(eligibleTotal)

  overviewTotal = requiredTotal + willingTotal + quoteTotal + unionTotal + newActorTotal + eligibleTotal;
  overviewTotal = Math.floor(overviewTotal);
  // console.log(overviewTotal)
  return overviewTotal;
}

function checkPhysical(actor){

    var portrayTotal,
        heightWeightTotal,
        hairTotal,
        bodyTotal,
        ethnicTotal,
        tatPierceTotal,
        complexionTotal,
        physicalTotal;

    //portrayAge
    actor.appearance.portrayAgeMin && actor.appearance.portrayAgeMin ? portrayTotal = 5 : portrayTotal = 0;

    //height and weight
    (actor.appearance.heightFeet || actor.appearance.heightInches) && actor.appearance.weight ? heightWeightTotal = 5 : heightWeightTotal = 0;

    //hair
    actor.appearance.hairColor && actor.appearance.hairLength ? hairTotal = 2.5 : hairTotal = 0;

    //body
    actor.appearance.bodyType !== undefined ? bodyTotal = 2.5 : bodyTotal = 0;

    //ethnicLook
    var ethnicLookArray = [actor.ethnicLook.caucasian, actor.ethnicLook.africanAmerican, actor.ethnicLook.nativeAmerican,
                          actor.ethnicLook.pacificIslander, actor.ethnicLook.asian, actor.ethnicLook.easternIndian,
                          actor.ethnicLook.middleEastern, actor.ethnicLook.hispanic]

    var ethnicLook =  _.some(ethnicLookArray, function(value){
                          return value === true;
                      })

    ethnicLook ? ethnicTotal = 5 : ethnicTotal = 0;

    //piercings, tattoos
    actor.piercings.present || actor.tattoos.present ?  tatPierceTotal = 2.5 : tatPierceTotal = 0;
    console.log(tatPierceTotal)

    //complexion
    actor.appearance.complexion ? complexionTotal = 2.5 : complexionTotal = 0


    physicalTotal = portrayTotal + heightWeightTotal + hairTotal + bodyTotal + complexionTotal + tatPierceTotal + ethnicTotal;
    physicalTotal = Math.floor(physicalTotal);
    console.log(physicalTotal)
    return physicalTotal;
}

function checkPhoto(actor){
  var headShotTotal,
      headToToeTotal,
      realLifeTotal,
      photoTotal;

  // console.log(actor.headShot)

  actor.headShot !== null ? headShotTotal = 8.75 : headShotTotal = 0;
  // console.log('head shot')
  // console.log(headShotTotal)

  actor.headToToe !== null ? headToToeTotal = 8.50 : headToToeTotal = 0;
  // console.log('head to toe')
  // console.log(headToToeTotal)

  actor.realLife !== null ? realLifeTotal = 8.50 : realLifeTotal = 0;
  // console.log('real life')
  // console.log(realLifeTotal)

  photoTotal = headShotTotal + headToToeTotal + realLifeTotal;
  photoTotal = Math.floor(photoTotal);

  return photoTotal;
}

// function checkProfile(actor){
//   var profileComplete;
//   console.log(profileComplete);
//   profileComplete = checkPhoto(actor) + checkPhoto(actor);
// }

// exports.checkProfile  = checkProfile;
// exports.checkProfile = checkProfile;
exports.checkPhoto    = checkPhoto;
exports.checkWardrobe = checkWardrobe;
exports.checkOverview = checkOverview;
exports.checkPhysical = checkPhysical;
