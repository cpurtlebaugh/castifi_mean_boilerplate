'use strict';

angular.module('castifiApp')
  .controller('SettingsCtrl', function ($scope, User, Auth) {
    $scope.errors = {};


    $scope.changePassword = function(form) {
      console.log(form)
      console.log(form.oldPassword)
      console.log(form.$valid)
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {

          form.password.$setValidity('mongoose', false);
          console.log($scope.errors)
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';

        });
      }
		};



  });
