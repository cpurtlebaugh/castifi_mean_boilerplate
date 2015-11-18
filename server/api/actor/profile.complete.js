'use strict';

var mongoose = require('mongoose');
var Actor    = require('./actor.model');
var _        = require('lodash');

// function checkProfile(actor){
// 	// console.log(actor)
// 	// console.log("hello world")
// 	return actor.email
// }
// function checkWardrobe(actor){
//   var wardrobeTotal,
//       basicTotal,
//       uniformTotal,
//       measureTotal;

//     _.forEach(actor.wardrobe, function(value, key){
//       (value === true)? basicTotal = 8.5 : basicTotal = 0;
//     })


//     _.forEach(actor.costumes, function(value, key){
//       (value === true)? uniformTotal = 8.25 : uniformTotal = 0;
//     })


//     actor.clothingWomenSizes.present || actor.clothingMenSizes.present ?  measureTotal = 8.25 : measureTotal = 0;

//     wardrobeTotal = basicTotal + uniformTotal + measureTotal;
//     wardrobeTotal = Math.floor(wardrobeTotal);
//     return wardrobeTotal;
//   }

function checkOverview(actor){
  console.log(typeof(actor))
  _.forEach(actor, function(value, key){
     console.log(value)
  })
  // var actorTest = JSON.parse(actor.willing)
  // console.log(actorTest)
  // total metric to equal 25 pts
  var requiredTotal,
      willingTotal,
      quoteTotal,
      unionTotal,
      newActorTotal,
      eligibleTotal,
      overviewTotal;

  // required: 6.25 pts
  var requiredArray = [actor.legalFirstName, actor.legalLastName, actor.overEighteen, actor.contact.mainPhoneNum, actor.contact.fullAddress];
  _.forEach(requiredArray, function(value){
    (value === undefined)? requiredTotal = 0 : requiredTotal = 6.25;
  })

  // willing: 12.5 pts
  //starts empty object
  // console.log(actor.willing);
  _.forEach(actor.willing, function(value, key){
    // console.log(key);
    (value === true)? willingTotal = 3.125 : willingTotal = 0;
  })

  // Quote: 12.5pts
  actor.info.movieQuote !== undefined ? (actor.info.movieQuote.length < 1 ? quoteTotal = 0 : quoteTotal = 3.125) :  quoteTotal = 0;

  // SAG or Non-Union: 17 pts
  actor.info.union !== undefined ? unionTotal = 4.25 : unionTotal = 0;

  // newActor: 16 pts
  actor.info.newActor !== undefined ? newActorTotal = 4 : newActorTotal = 0;

  // sagEligible: 17pts
  actor.info.sagEligible !== undefined ? eligibleTotal = 4.25 : eligibleTotal = 0;

  // console.log(unionTotal)
  // console.log(requiredArray);
  console.log(willingTotal)
  overviewTotal = requiredTotal + willingTotal + quoteTotal + unionTotal + newActorTotal + eligibleTotal;
  overviewTotal = Math.floor(overviewTotal);
  return overviewTotal;
}

<<<<<<< HEAD

exports.checkProfile  = checkProfile;
exports.checkWardrobe = checkWardrobe;
=======
// function checkPhysical(actor){

//     var portrayTotal,
//         heightWeightTotal,
//         hairTotal,
//         bodyTotal,
//         ethnicTotal,
//         tatPierceTotal,
//         complexionTotal;

//     //portrayAge    
//     actor.appearance.portrayAgeMin && actor.appearance.portrayAgeMin ? portrayTotal = 5 : portrayTotal = 0;
//     //height and weight
//     (actor.appearance.heightFeet || actor.appearance.heightInches) && actor.appearance.weight ? heightWeightTotal = 5 : heightWeightTotal = 0;
//     //hair
//     actor.appearance.hairColor && actor.appearance.hairLength ? hairTotal = 2.5 : hairTotal = 0;
//     //body
//     actor.appearance.bodyType !== undefined ? bodyTotal = 2.5 : bodyTotal = 0;
//     //ethnicLook
//     // console.log(actor.ethnicLook)
//     _.forEach(actor.ethnicLook, function(value, key){
//       // console.log("check");
//       // console.log(value);
//       // console.log(key);
//       (value === true)? ethnicTotal = 5 : ethnicTotal = 0;
//     })
//     //actor.piercings, actor.tattoos
//     //actor.appearance.complexion
//     // console.log("working")
//     // console.log(heightWeightTotal)
//     // console.log(actor.appearance.bodyType)
//     // console.log(ethnicTotal)
// } 

// exports.checkProfile  = checkProfile;
// exports.checkWardrobe = checkWardrobe;
>>>>>>> 6bdd98ba752fad876d6ee27316ad6642f8df42d0
exports.checkOverview = checkOverview;
// exports.checkPhysical = checkPhysical