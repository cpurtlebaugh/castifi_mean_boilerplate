'use strict';

angular.module('castifiApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl',
        // data: {
        //   roles: ['Admin']
        // }
      })
      .state('admin.dashboard', {
        url: '/dashboard',
        templateUrl: 'app/admin/admin-dashboard.html',
        controller: 'AdminCtrl'
      })
      .state('admin.users', {
        url: '/users',
        templateUrl: 'app/admin/admin-users.html',
        controller: 'AdminCtrl'
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
      .state('admin.table', {
        url: '/table',
        templateUrl: 'app/admin/admin-actor/admin-actors-table.html',
        controller: 'AdminActorsCtrl'

      })
      .state('admin.actors.detail', {
        url: '/:id',
        templateUrl: 'app/admin/admin-actor/admin-actors-detail.html',
        controller: 'AdminActorsDetailCtrl'
      })
      .state('admin.actors.edit', {
        url: '/:id/edit',
        templateUrl: 'app/admin/admin-actor/admin-actors-edit.html',
        controller: 'AdminActorsEditCtrl'
      })
       .state('admin.actors.photos', {
        url: '/:id/photos',
        templateUrl: 'app/admin/admin-actor/admin-actors-photos.html',
        controller: 'AdminActorsPhotosCtrl'
      })

  });
