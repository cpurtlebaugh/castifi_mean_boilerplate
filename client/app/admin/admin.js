'use strict';

angular.module('castifiApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl',
         resolve:{
          currentUsers: function(User){
            return User.query().$promise;
          }
        }
      })
      .state('admin.users', {
        url: '/users',
        templateUrl: 'app/admin/admin-users.html',
        controller: 'AdminCtrl',
         resolve:{
          currentUser: function(currentUsers){
            return currentUsers;
          }
        }
      })
        .state('admin.actors', {
        url: '/actors',
        templateUrl: 'app/admin/admin-actor/admin-actors.html',
        controller: 'AdminActorsCtrl'
      })
        .state('admin.actors.list', {
      url: '/list',
      templateUrl: 'app/admin/admin-actor/admin-actors-list.html',
      controller: 'AdminActorsCtrl'
      })
       .state('admin.actors.detail', {
      url: '/:id',
      templateUrl: 'app/admin/admin-actor/admin-actors-detail.html',
      controller: 'AdminActorsDetailCtrl'
    })
  });
