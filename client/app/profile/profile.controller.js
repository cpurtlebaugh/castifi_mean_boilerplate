'use strict';

angular.module('castifiApp')
  .controller('ProfileCtrl', function ($scope, $http, socket, Auth, User, $state) {

      $scope.user = User.get();
      $scope.getCurrentUser = Auth.getCurrentUser;
      var user_id = $scope.getCurrentUser()._id;
      $scope.submitted = false;

       $scope.register = function register(form) {
            $scope.submitted = true;

         $http.put('/api/users/' + user_id, $scope.user )
            .success(function() {
                  if($state.is('profile.basic')){ $state.go('profile.personal')};
                  if($state.is('profile.personal')){ $state.go('profile.address')};
                  if($state.is('profile.address')){ $state.go('profile.confirmation')};
                  if($state.is('profile.confirmation')){$scope.finished = true};
              });

        };

  });
