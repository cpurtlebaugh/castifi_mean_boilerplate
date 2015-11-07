'use strict';

angular.module('castifiApp')
  .controller('SettingsCtrl', function ($scope, User, Auth, $http, $stateParams, $state) {
    $scope.errors = {};
    console.log($stateParams);

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {

          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';

        });
      }
		};

    $scope.passwordReset = function(form){
        $scope.submitted = true;
        var data = {email: $scope.user.email};
        if(form.$valid){
          $http.post("api/users/forgot", data)
            .success(function(data){
              console.log(data)
            })
            .error(function(err){
              $scope.errors = 'That email does no seem to exist';
              console.log($scope.errors)
              return $scope.errors;

            })

        }
    }

    $scope.newPasswordReset = function(form){
      $scope.submitted = true;
      var data = {password: $scope.user.password}
      console.log(form)
      console.log(form.$valid)
      if(form.$valid){
        $http.post('/api/users/reset/' + $stateParams.token, data)
      }
      else {
        $scope.errors;
      }
    }
});
