'use strict';

angular.module('castifiApp')
  .controller('SettingsEmailCtrl', function ($scope, User, Auth, Actor) {
    $scope.errors = {};
    // $scope.user = currentUser;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.user = $scope.getCurrentUser();
    $scope.user.newEmail = "";
    console.log($scope.user.email)


    $scope.changeEmail = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        User.update({id: $scope.user._id}, {email: $scope.user.newEmail},
          function success(data){
             console.log(data)
             $scope.emailMessage = 'Email successfully changed.';
             $scope.user.oldEmail = "";
             $scope.user.newEmail = "";
          },
          function error(data){
          })

         //if form valid update the Actor model
        Actor.update({id: $scope.user.actorId._id }, {email: $scope.user.newEmail},
          function success(data){
                console.log("actor success data")
                console.log(data)
            },
            function error(data){}
            )


      } else {
          form.newEmail.$setValidity('mongoose', false);
          $scope.errors.other = 'Please provide a valid email format.';
          $scope.emailMessage = '';
        }



    };


});