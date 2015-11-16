'use strict';

angular.module('castifiApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User, Actor, $window) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();
    $scope.actors = Actor.query();

    $scope.delete = function(user) {
      var confirm = $window.confirm("Are you sure you want to permanently delete " + user.email + " ?")
  
      if(confirm){ 
        Actor.remove({ id: user.actorId});
        User.remove({ id: user._id });
        angular.forEach($scope.users, function(u, i) {
          if (u === user) {
            $scope.users.splice(i, 1);
          }
        });
      }
    };
  

  });
