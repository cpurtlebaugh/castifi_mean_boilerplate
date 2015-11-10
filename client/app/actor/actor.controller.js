'use strict';

angular.module('castifiApp')
  .controller('ActorCtrl', function ($scope, Auth, User, $state,
    Actor, currentUser, $rootScope) {

       $scope.user = currentUser
       $scope.actor = $scope.user.actorId
       $scope.onlyNumbers = /^[0-9]+$/;

       if($scope.actor !== undefined){
           if($scope.actor.info !== undefined){
             var actingSince  = new Date($scope.actor.info.actingSince)
              console.log(actingSince)
              console.log(typeof(actingSince))
              $scope.actor.info.actingSince  = moment(actingSince).format("yyyy-MM-dd")
              console.log($scope.actor.info.actingSince)
          }
           if($scope.actor.appearance !== undefined){
              var pregnantDueDate = new Date($scope.actor.appearance.pregnantDueDate)
              console.log(pregnantDueDate)
              $scope.actor.appearance.pregnantDueDate  = moment(pregnantDueDate).format("yyyy-MM-dd")
              console.log( $scope.actor.appearance.pregnantDueDate)
              // console.log( typeof($scope.actor.appearance.pregnantDueDate))
          }
       }

         $scope.register = function register(form) {
              console.log(form)
               console.log(form.$valid)
               $scope.submitted = true;
               //this might be throwing off the form
               if(form.$valid){
                    if($scope.actor){
                          Actor.update({id: $scope.actor._id }, $scope.actor,
                                function success(data){
                                   if($state.is('actor.edit.overview')){ $state.go('actor.edit.photos')};
                                   if($state.is('actor.edit.photos')){ $state.go('actor.edit.physical')};
                                   if($state.is('actor.edit.physical')){ $state.go('actor.edit.wardrobe')};
                                   if($state.is('actor.edit.wardrobe')){ $state.go('profile')};
                              }),
                              function error(){
                                $state.go('actor.edit.overview')
                              }

                       }


                }
            };

  });
