'use strict';

angular.module('castifiApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User, currentUsers) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();
    // console.log(typeof($scope.users))
    // console.log(currentUsers)
    // console.log(currentUsers.length)
    // console.log(typeof(currentUsers))

    // User.query()
    //   .then(function(data){
    //     console.log(data)
    //   })

    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };
  });
