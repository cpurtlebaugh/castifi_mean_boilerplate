'use strict';

angular.module('castifiApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .state('signuptest', {
        url: '/signuptest',
        templateUrl: 'app/account/signup/signup-test.html',
        controller: 'SignupCtrl'
      })
      .state('forgot', {
        url: '/forgot',
        templateUrl: 'app/account/settings/forgot-password.html',
        controller: 'SettingsCtrl'
      })

      .state('settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        authenticate: true,
      });

      // $urlRouterProvider.otherwise('/welcome');
  });
