'use strict';

angular.module('castifiApp')
  .controller('SettingsCtrl', function ($scope, User, Auth, currentUser) {
    $scope.errors = {};
    $scope.user = currentUser;
    $scope.user.newEmail = "";
    console.log($scope.user)

    $scope.changeEmail = function(form) {
      console.log("change email working")
      console.log(form)
      console.log($scope.user._id)
      console.log($scope.user.newEmail)
      console.log(form.$valid)
      $scope.submitted = true;
      
      if(form.$valid) {
        console.log($scope.user.newEmail)
        User.update({id: $scope.user._id}, {email: $scope.user.newEmail}, 
          function success(data){
             console.log(data)
             $scope.emailMessage = 'Email successfully changed.';
          }),
          function error(data){
            console.log(data)
          }
        // .then( function(data) {
        //   console.log(data)
        //   $scope.message = 'Password successfully changed.';
      
        // })
        // .catch( function() {
        //   form.password.$setValidity('mongoose', false);
        //   $scope.errors.other = 'Incorrect password';
        //   $scope.message = '';
        // });
      }
    };
  

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
  


  });
