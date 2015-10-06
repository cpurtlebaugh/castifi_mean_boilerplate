'use strict';

angular.module('castifiApp')
  .factory('currentActor', function ($resource, $http, Auth, Actor) {
    return $resource('/api/actors/:id/', {
      id: '@_id'
    },
    {
      user: {
        method: 'GET',
        params: {
          id:'user'
        }
      }
    });
  });