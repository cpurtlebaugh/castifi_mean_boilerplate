'use strict';

angular.module('castifiApp')
  .controller('AdminActorsDetailCtrl', function ($scope, $stateParams, $http, Auth, User, Actor) {
    $scope.actor = Actor.get({id: $stateParams.id})
    console.log($scope.actor)
    console.log('hello there')
});
