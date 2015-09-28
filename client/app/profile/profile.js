'use strict';

angular.module('castifiApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      //basic view for nested profile views
      .state('profile', {
        url: '/profile',
        templateUrl: 'app/profile/profile.html',
        controller: 'ProfileCtrl'
      })
      //shows the completed profile
      .state('profile.detail', {
        url: '/detail',
        templateUrl: 'app/profile/profile-detail.html',
        controller: 'ProfileCtrl'
      })
      // basic info and contact (union, stand-in, set-coordinator)
      .state('profile.basic', {
        url: '/basic',
        templateUrl: 'app/profile/profile-basic.html',
        controller: 'ProfileCtrl'
      })
      //appearance and measurements
        .state('profile.appearance', {
        url: '/appearance',
        templateUrl: 'app/profile/profile-appearance.html',
        controller: 'ProfileCtrl'
      })  
       //looks //costumes
      .state('profile.looks', {
        url: '/looks',
        templateUrl: 'app/profile/profile-looks.html',
        controller: 'ProfileCtrl'
      })    
      //skills i.e. bartender
        .state('profile.skills', {
        url: '/skills',
        templateUrl: 'app/profile/profile-skills.html',
        controller: 'ProfileCtrl'
      })
      //property //pets //cars  
       .state('profile.property', {
        url: '/property',
        templateUrl: 'app/profile/profile-property.html',
        controller: 'ProfileCtrl'
      })  
        //sports //dance// music instruments 
        .state('profile.talents', {
        url: '/talents',
        templateUrl: 'app/profile/profile-talents.html',
        controller: 'ProfileCtrl'
      });   

       $urlRouterProvider.otherwise('/profile');  
  });