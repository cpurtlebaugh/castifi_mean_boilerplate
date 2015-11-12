'use strict';

angular.module('castifiApp')
  .controller('ActorCtrl', function ($scope, Auth, User, $state,
    Actor, currentUser) {

       $scope.user = currentUser;
       $scope.actor = $scope.user.actorId;
       $scope.onlyNumbers = /^[0-9]+$/;
       $scope.minAgeOptions = _.range(12, 61);
       $scope.maxAgeOptions = _.range(18, 101);
       $scope.heightFeetOptions = _.range(0, 8);
       $scope.heightInchesOptions = _.range(0, 12);
       $scope.weightOptions = _.range(60, 301);

       $scope.open = function($event) {
           $event.preventDefault();
           $event.stopPropagation();

            $scope.opened = true;
      };

         $scope.register = function register(form) {
               $scope.submitted = true;

               if(form.$valid){
                    if($scope.actor){
                          Actor.update({id: $scope.actor._id }, $scope.actor,
                                function success(){
                                   if($state.is('actor.edit.overview')){ $state.go('actor.edit.photos')}
                                   if($state.is('actor.edit.photos')){ $state.go('actor.edit.physical')}
                                   if($state.is('actor.edit.physical')){ $state.go('actor.edit.wardrobe')}
                                   if($state.is('actor.edit.wardrobe')){ $state.go('profile')}
                              }),
                              function error(){
                                $state.go('actor.edit.overview')
                              }

                       }


                }
            };

  });
