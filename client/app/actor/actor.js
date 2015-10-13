'use strict';

angular.module('castifiApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('actor', {
        url: '/actor',
        templateUrl: 'app/actor/actor.html',
        controller: 'ActorCtrl',
        resolve:{
          currentPerson: function(User){
            return User.get();
          }
        }
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
      .state('actor.facial', {
        url: '/facial',
        templateUrl: 'app/actor/actor-facial.html',
        controller: 'ActorCtrl'
      })
      //tattoos and piercings
      .state('actor.enhancements', {
        url: '/enhancements',
        templateUrl: 'app/actor/actor-enhancements.html',
        controller: 'ActorCtrl'
      })
      //misc: disabled, pregnant, willing to(nudity, kissing, change hair, eat meat)
      .state('actor.niche', {
        url: '/niche',
        templateUrl: 'app/actor/actor-niche.html',
        controller: 'ActorCtrl'
      })
      //wardrobe: measurements and costumes
       .state('actor.wardrobe', {
        url: '/wardrobe',
        templateUrl: 'app/actor/actor-wardrobe.html',
        controller: 'ActorCtrl'
      })
       //male and female clothing measurements
        .state('actor.measurements', {
        url: '/measurements',
        templateUrl: 'app/actor/actor-measurements.html',
        controller: 'ActorCtrl'
      })
      //photos
        .state('actor.photos', {
        url: '/photos',
        templateUrl: 'app/actor/actor-photos.html',
        controller: 'ActorUploadCtrl'
      });

      $urlRouterProvider.otherwise('/');    

  });
