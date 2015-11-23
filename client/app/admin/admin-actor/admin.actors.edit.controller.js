'use strict';

angular.module('castifiApp')
  .controller('AdminActorsEditCtrl', function ($scope, $stateParams, Actor, $state) {

   $scope.minAgeOptions = _.range(12, 61);
   $scope.maxAgeOptions = _.range(18, 101);
   $scope.heightFeetOptions = _.range(0, 8);
   $scope.heightInchesOptions = _.range(0, 12);
   $scope.weightOptions = _.range(60, 301);

   $scope.actor = Actor.get({id: $stateParams.id})

   $scope.register = function register(form) {
       $scope.submitted = true;

       // if(form.$valid){
            if($scope.actor){
                Actor.update({id: $scope.actor._id }, $scope.actor,
                      function success(){
                        $state.go('admin.actors.detail', {id: $scope.actor._id})
                    }),
                    function error(){
                      $state.go('admin.actors.edit', {id: $scope.actor._id})
                    }

             }


        // }
    };

});