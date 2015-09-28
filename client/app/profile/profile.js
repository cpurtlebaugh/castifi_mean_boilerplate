'use strict';

angular.module('castifiApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('profile', {
        url: '/profile',
        templateUrl: 'app/profile/profile.html',
        controller: 'ProfileCtrl'
      })
      .state('profile.detail', {
        url: '/detail',
        templateUrl: 'app/profile/profile-detail.html',
        controller: 'ProfileCtrl'
      })
      .state('profile.edit', {
        url: '/edit',
        templateUrl: 'app/profile/profile-edit.html',
        controller: 'ProfileCtrl'
      });
  });