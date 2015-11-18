'use strict';

var mongoose = require('mongoose');
var Actor    = require('./actor.model');
var _        = require('lodash');

function checkProfile(actor){
	console.log(actor)
	console.log("hello world")
	return actor.email
}

function checkWardrobe(actor){
  var total,
      basicTotal,
      uniformTotal,
      measureTotal;

    _.forEach(actor.wardrobe, function(value, key){
      (value === true)? basicTotal = 8.5 : basicTotal = 0;
    })


    _.forEach(actor.costumes, function(value, key){
      (value === true)? uniformTotal = 8.25 : uniformTotal = 0;
    })


    if(actor.clothingWomenSizes.present || actor.clothingMenSizes.present) {
      measureTotal = 8.25;
    }
    else {
      measureTotal = 0;
    }

    total = basicTotal + uniformTotal + measureTotal;
    total = Math.floor(total);
    return total;
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
  var requiredArray = [actor.legalFirstName, actor.legalLastName, actor.overEighteen, actor.contact.mainPhoneNum, actor.contact.fullAddress];
  _.forEach(requiredArray, function(value){
    (value === undefined)? requiredTotal = 0 : requiredTotal = 6.25;
  })

  // willing: 12.5 pts
  _.forEach(actor.willing, function(value, key){
    (value === true)? willingTotal = 3.125 : willingTotal = 0;
  })

  // Quote: 12.5pts
  // console.log(actor.info.movieQuote.length)
  if(actor.info.movieQuote !== undefined){
    quoteTotal = 3.125;
    if(actor.info.movieQuote.length < 1){
      console.log(actor.info.movieQuote);
      quoteTotal = 0;
    }
  }
  else {
    quoteTotal = 0;
  }

  // SAG or Non-Union: 17 pts
  if(actor.info.union !== undefined){
    unionTotal = 4.25;
  }
  else {
    unionTotal = 0;
  }

  // newActor: 16 pts
  if(actor.info.newActor !== undefined){
    newActorTotal = 4;
  }
  else {
    newActorTotal = 0;
  }

  // sagEligible: 17pts
  if(actor.info.sagEligible !== undefined){
    eligibleTotal = 4.25;
  }
  else {
    eligibleTotal = 0;
  }
  console.log(eligibleTotal)
  // console.log(requiredArray);
  overviewTotal = requiredTotal + willingTotal + quoteTotal + unionTotal + newActorTotal + eligibleTotal;
  overviewTotal = Math.floor(overviewTotal);
  return overviewTotal;
}

exports.checkProfile  = checkProfile;
exports.checkWardrobe = checkWardrobe;
exports.checkOverview = checkOverview;
