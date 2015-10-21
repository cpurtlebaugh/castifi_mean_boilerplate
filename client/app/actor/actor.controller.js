'use strict';

angular.module('castifiApp')
  .controller('ActorCtrl', function ($scope, $http, socket, Auth, User, $state,
    Actor, $filter, currentUser, currentActor) {

       $scope.getCurrentUser = Auth.getCurrentUser;
       $scope.user = $scope.getCurrentUser();
       var user_id = $scope.getCurrentUser()._id;
       $scope.actor = $scope.user.actorId
       // $scope.actor.dob = new Date($scope.actor.dob) 
       console.log($scope.actor)

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
