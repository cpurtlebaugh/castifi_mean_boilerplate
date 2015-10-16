'use strict';

angular.module('castifiApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('actor', {
        url: '/actor',
        templateUrl: 'app/actor/actor.html',
        controller: 'ActorCtrl',
        resolve:{
           currentActor: function(User){
            return User.get()._id;
          },
          currentUser: function(User){
            return User.get();
          }
        }
      })
      .state('welcome', {
        url: '/welcome',
        templateUrl: 'app/actor/actor-welcome.html',
        controller: 'ActorCreateCtrl',
        resolve:{
          currentActor: function($http){
            return $http.get('api/users/me');
            },
          currentUser: function(User){
            return User.get();
          }
        }
      })
      //NEED TO ADD NAVBAR
       .state('actor.home', {
        url: '/home',
        templateUrl: 'app/actor/actor-home.html',
        controller: 'ActorCtrl'
      })

       //OVERVIEW
        .state('actor.overview', {
        url: '/overview',
        templateUrl: 'app/actor/actor-overview.html',
        controller: 'ActorCtrl',
        resolve:{
          currentUser: function(User){
            return User.get();
          }
        }
      })

       //PHYSICAL APPEARANCE
       .state('actor.physical', {
        url: '/physical',
        templateUrl: 'app/actor/actor-physical.html',
        controller: 'ActorCtrl',
        resolve:{
          currentUser: function(User){
            return User.get();
          }
        }
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


      //WARDROBE
      //wardrobe: measurements and costumes
       .state('actor.wardrobe', {
        url: '/wardrobe',
        templateUrl: 'app/actor/actor-wardrobe.html',
        controller: 'ActorCtrl',
        resolve:{
          currentUser: function(User){
            return User.get();
          }
        }
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
        controller: 'ActorUploadCtrl',
          resolve:{
            currentActor: function($http){
            return $http.get('api/users/me');
            },
          currentUser: function(User){
            return User.get();
          }
        }
      })

      //CONFIRMATION
      .state('actor.confirmation', {
        url: '/confirmation',
        templateUrl: 'app/actor/actor-confirmation.html',
        controller: 'ActorUploadCtrl',
        resolve:{
          currentUser: function(User){
            return User.get();
          }
        }
      });


      $urlRouterProvider.otherwise('/actor/overview');

  });
