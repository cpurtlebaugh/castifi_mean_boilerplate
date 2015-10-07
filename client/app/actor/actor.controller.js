'use strict';

angular.module('castifiApp')
  .controller('ActorCtrl', function ($scope, $http, socket, Auth, User, $state, 
    Actor, $filter, currentPerson) {
		
     $scope.actor = currentPerson.actorId;
	   $scope.user = User.get();
     $scope.getCurrentUser = Auth.getCurrentUser;
     var user_id = $scope.getCurrentUser()._id;

     $scope.register = function register(form) {
           $scope.submitted = true;
	         
	          Actor.update({id: $scope.actor._id }, $scope.actor, 
              function success(data){
                console.log(data)
               if($state.is('actor.basic')){ $state.go('actor.facial')};
               if($state.is('actor.facial')){ $state.go('actor.enhancements')};
               if($state.is('actor.enhancements')){ $state.go('actor.niche')};   
               if($state.is('actor.niche')){ $state.go('actor.wardrobe')};  
               if($state.is('actor.wardrobe')){ $state.go('actor.measurements')}; 
               if($state.is('actor.measurements')){ $state.go('actor.home')};      
            }),
            function error(){
              $state.go('actor.home')
            }  
        };


  });
