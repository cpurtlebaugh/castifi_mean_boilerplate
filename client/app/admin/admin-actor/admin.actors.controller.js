'use strict';

angular.module('castifiApp')
  .controller('AdminActorsCtrl', function ($scope, $http, Auth, User, Actor) {

    // Use the User $resource to fetch all users
    $scope.actors = Actor.query();

    $scope.delete = function(actor) {
    console.log(actor)
      Actor.remove({ id: actor._id });
      angular.forEach($scope.actors, function(a, i) {
        if (a === actor) {
          $scope.actors.splice(i, 1);
        }
      });
      User.remove({ id: actor.ownedBy});
    }
  });


