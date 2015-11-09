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
      .state('reset', {
        url: '/reset',
        abstract: true,
        template: '<ui-view></>',
        controller: 'SettingsCtrl',
        authenticate: true,
      })
      .state('reset.details', {
        url: '/:token',
        templateUrl: 'app/account/settings/reset.html',
        controller: 'SettingsCtrl'
        // authenticate: true,
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        authenticate: true,
      });

      // $urlRouterProvider.otherwise('/welcome');
  });
