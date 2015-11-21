'use strict';

angular.module('castifiApp')
  .controller('AdminActorsCtrl', function ($scope, $http, Auth, User, Actor, $window, $state) {

    // Use the User $resource to fetch all users
    $scope.actors = Actor.query();
    $scope.users  = User.query();

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

    $scope.deactive = function(actor){
      if(actor.active === true){
        Actor.update({ id: actor._id}, {active: false}, function success(data){
          $state.reload()
        })
      }
      else {
        Actor.update({ id: actor._id}, {active: true}, function success(data){
          $state.reload()
        })
      }
    }


  });


