'use strict';

angular.module('castifiApp')
  .controller('AdminActorsDetailCtrl', function ($scope, $stateParams, $http, Auth, User, Actor) {
    // $scope.actor = currentActor;
    $scope.actor = Actor.get({id: $stateParams.id})
    // $scope.actors = Actor.query();
    console.log($scope.actor)
    console.log('hello there')
});
