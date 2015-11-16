'use strict';

angular.module('castifiApp')
  .controller('AdminActorsEditCtrl', function ($scope, $stateParams, Actor) {

    $scope.actor = Actor.get({id: $stateParams.id})
    console.log($scope.actor)

    // $scope.register = function register(form) {
    //            $scope.submitted = true;

    //            if(form.$valid){
    //                 if($scope.actor){
    //                       Actor.update({id: $scope.actor._id }, $scope.actor,
    //                             function success(){
    //                                if($state.is('actor.edit.overview')){ $state.go('actor.edit.photos')}
    //                                if($state.is('actor.edit.photos')){ $state.go('actor.edit.physical')}
    //                                if($state.is('actor.edit.physical')){ $state.go('actor.edit.wardrobe')}
    //                                if($state.is('actor.edit.wardrobe')){ $state.go('profile')}
    //                           }),
    //                           function error(){
    //                             $state.go('actor.edit.overview')
    //                           }

    //                    }


    //             }
    //         };

});