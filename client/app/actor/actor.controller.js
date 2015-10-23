'use strict';

angular.module('castifiApp')
  .controller('ActorCtrl', function ($scope, Auth, User, $state,
    Actor, currentUser) {

       $scope.getCurrentUser = Auth.getCurrentUser;
       $scope.user = $scope.getCurrentUser();
       var user_id = $scope.getCurrentUser()._id;
       $scope.actor = $scope.user.actorId

       if($scope.actor !== undefined){
           if($scope.actor.dob !== undefined){$scope.actor.dob = new Date($scope.actor.dob)}
           if($scope.actor.info !== undefined){$scope.actor.info.actingSince  = new Date($scope.actor.info.actingSince)}
           if($scope.actor.appearance !== undefined){$scope.actor.appearance.pregnantDueDate = new Date($scope.actor.appearance.pregnantDueDate)}
       }

         $scope.register = function register(form) {
               $scope.submitted = true;
               if(form.$valid){
                    if($scope.actor){
                          Actor.update({id: $scope.actor._id }, $scope.actor,
                                function success(data){
                                   if($state.is('actor.edit.overview')){ $state.go('actor.edit.photos')};
                                   if($state.is('actor.edit.photos')){ $state.go('actor.edit.physical')};
                                   if($state.is('actor.edit.physical')){ $state.go('actor.edit.wardrobe')};
                                   if($state.is('actor.edit.wardrobe')){ $state.go('confirmation')};
                              }),
                              function error(){
                                $state.go('actor.edit.overview')
                              }

                       }


                }
            };

  });
