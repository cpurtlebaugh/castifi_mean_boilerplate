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
      //BASIC ACTOR PROFILE VIEW
        .state('actor.profile', {
        url: '/profile',
        templateUrl: 'app/actor/actor-profile.html',
        controller: 'ActorCtrl',
      })
      //EDIT NESTED VIEW WITH ACTOR NAVBAR
        .state('actor.edit', {
        url: '/edit',
        templateUrl: 'app/actor/actor-edit.html',
        controller: 'ActorCtrl',
      })
       //OVERVIEW EDIT
        .state('actor.edit.overview', {
        url: '/overview',
        templateUrl: 'app/actor/actor-edit-overview.html',
        controller: 'ActorCtrl',
        resolve:{
          currentUser: function(User){
            return User.get();
          }
        }
      })  
      //PHOTOS EDIT
        .state('actor.edit.photos', {
        url: '/photos',
        templateUrl: 'app/actor/actor-edit-photos.html',
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
       //PHYSICAL APPEARANCE EDIT
       .state('actor.edit.physical', {
        url: '/physical',
        templateUrl: 'app/actor/actor-edit-physical.html',
        controller: 'ActorCtrl',
        resolve:{
          currentUser: function(User){
            return User.get();
          }
        }
      })
      //WARDROBE EDIT
       .state('actor.edit.wardrobe', {
        url: '/wardrobe',
        templateUrl: 'app/actor/actor-edit-wardrobe.html',
        controller: 'ActorCtrl',
        resolve:{
          currentUser: function(User){
            return User.get();
          }
        }
      })
       //WELCOME
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
      //CONFIRMATION 
      .state('confirmation', {
        url: '/confirmation',
        templateUrl: 'app/actor/actor-confirmation.html',
        controller: 'ActorUploadCtrl',
        resolve:{
          currentUser: function(User){
            return User.get();
          }
        }
      });


      $urlRouterProvider.otherwise('/actor/welcome');

  });
