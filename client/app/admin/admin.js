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
       .state('admin.dashboard', {
      url: '/dashboard',
      templateUrl: 'app/admin/admin-dashboard.html',
      controller: 'AdminCtrl'
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
      .state('admin.actors.edit', {
        url: '/edit',
        abstract: true,
        template: '<ui-view></>',
        controller: 'AdminActorsDetailCtrl'
      })
      .state('admin.actors.edit.detail', {
        url: '/:id',
        templateUrl: 'app/actor/actor-edit-overview.html',
        controller: 'AdminActorsDetailCtrl'
        // resolve:{
        //   currentActor: function(Actor, $stateParams){
        //     return Actor.get({id: $stateParams.id});
        //   }
        // }
    })

  });
