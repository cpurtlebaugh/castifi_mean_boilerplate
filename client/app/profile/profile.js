'use strict';

angular.module('castifiApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      //basic view for nested profile views
      .state('profile', {
        url: '/profile',
        templateUrl: 'app/profile/profile.html',
        controller: 'ProfileCtrl',
        resolve:{
             currentActor:  function ($http, Auth) {
                  var getCurrentUser = Auth.getCurrentUser;
                  var user_id = getCurrentUser()._id
                  return $http.get('/api/actors/', {ownedBy: user_id});
            },
        }
      })
      // basic info //phone #, email (photo)
      .state('profile.basic', {
        url: '/basic',
        templateUrl: 'app/profile/profile-basic.html',
        controller: 'ProfileCtrl'
      })
      //personal info : full name, gender, birthday
        .state('profile.personal', {
        url: '/personal',
        templateUrl: 'app/profile/profile-personal.html',
        controller: 'ProfileCtrl'
      })  
       //address
      .state('profile.address', {
        url: '/address',
        templateUrl: 'app/profile/profile-address.html',
        controller: 'ProfileCtrl'
      })    
      //confirmation
        .state('profile.confirmation', {
        url: '/confirmation',
        templateUrl: 'app/profile/profile-confirmation.html',
        controller: 'ProfileCtrl'
      })
       //shows the completed profile
      .state('profile.detail', {
        url: '/detail',
        templateUrl: 'app/profile/profile-detail.html',
        controller: 'ProfileCtrl'
      });  

       $urlRouterProvider.otherwise('/profile');  
  });