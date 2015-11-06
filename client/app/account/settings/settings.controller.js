'use strict';

angular.module('castifiApp')
  .controller('SettingsCtrl', function ($scope, User, Auth, $http) {
    $scope.errors = {};


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
        console.log($scope.user.email)
        var data = {email: $scope.user.email};
        $http.post("api/users/forgot", data)
            // .success(function(data){
            //       console.log(data)
            //       //insert message to user 'check your email for reset instructions'
            // })
    }   



  });
