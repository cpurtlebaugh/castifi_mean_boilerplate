'use strict';

angular.module('castifiApp')
  .controller('ProfileCtrl', function ($scope, $http, socket, Auth, User, $state) {

      $scope.user = User.get();
      $scope.getCurrentUser = Auth.getCurrentUser;
      var user_id = $scope.getCurrentUser()._id;

     $scope.register = function register(form) {
       $scope.submitted = true;

       $http.put('/api/users/' + user_id, $scope.user )
          .success(function() {
                $state.go('profile.detail')
            });
      };

  
    //   $http.get('/api/users/me').success(function(data) {
    //   $scope.user = data;
    //   socket.syncUpdates('users', $scope.user);
    // });
  

  });
