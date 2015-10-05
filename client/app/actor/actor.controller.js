'use strict';

angular.module('castifiApp')
  .controller('ActorCtrl', function ($scope, $http, socket, Auth, User, $state, 
    Actor, currentActor, $filter) {
		
	   // $scope.actor = currentActor.data;
	   $scope.user = User.get();
     $scope.getCurrentUser = Auth.getCurrentUser;
     var user_id = $scope.getCurrentUser()._id;
     // $scope.profileId = currentActor.data[0]._id
     // console.log(currentActor)

     var actor = $filter('filter')(currentActor.data, { ownedBy: user_id});
     console.log(currentActor.data[0])
     $scope.actorId = actor[0]._id;
     console.log($scope.actorId)
     $scope.actor = actor[0]

     $scope.register = function register(form) {
       		 //if there is no actor.ownedBy then create
           //how will I get actor info
           //Actor.get()
           //else
           $scope.submitted = true;
	         
	          Actor.update({id: $scope.actorId }, $scope.actor, 
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
