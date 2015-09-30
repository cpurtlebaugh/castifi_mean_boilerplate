'use strict';

angular.module('castifiApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('actor', {
        url: '/actor',
        templateUrl: 'app/actor/actor.html',
        controller: 'ActorCtrl'
      })
       .state('actor.home', {
        url: '/home',
        templateUrl: 'app/actor/actor-home.html',
        controller: 'ActorCtrl'
      })
      //basic: union info, bio and appearance
      .state('actor.basic', {
        url: '/basic',
        templateUrl: 'app/actor/actor-basic.html',
        controller: 'ActorCtrl'
      })
      //basic: union info, bio and appearance
      .state('actor.figure', {
        url: '/figure',
        templateUrl: 'app/actor/actor-figure.html',
        controller: 'ActorCtrl'
      })
      //wardrobe: measurements and costumes
       .state('actor.wardrobe', {
        url: '/wardrobe',
        templateUrl: 'app/actor/actor-wardrobe.html',
        controller: 'ActorCtrl'
      })
      //photos
        .state('actor.photos', {
        url: '/photos',
        templateUrl: 'app/actor/actor-photos.html',
        controller: 'ActorCtrl'
      });

  });
