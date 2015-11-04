'use strict';

angular.module('castifiApp')
  .controller('AdminActorsCtrl', function ($scope, $http, Auth, User, Actor) {

    // Use the User $resource to fetch all users
    $scope.actors = Actor.query();

    // $scope.delete = function(actor) {
    //   Actor.remove({ id: actor._id });
    //   angular.forEach($scope.actors, function(u, i) {
    //     if (u === user) {
    //       $scope.users.splice(i, 1);
    //     }
    //   });
    // };
  });
