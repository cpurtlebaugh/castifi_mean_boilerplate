'use strict';

angular.module('castifiApp')
  .controller('AdminActorsCtrl', function ($scope, $http, Auth, User, Actor, $window) {

    // Use the User $resource to fetch all users
    $scope.actors = Actor.query();

    $scope.delete = function(actor) {
        var confirm = $window.confirm("Are you sure you want to permanently delete " + actor.email + " ?")
        
        if(confirm){
            Actor.remove({ id: actor._id });
            angular.forEach($scope.actors, function(a, i) {
              if (a === actor) {
                $scope.actors.splice(i, 1);
              }
            });
            User.remove({ id: actor.ownedBy});
        }
    }
  

  });


