'use strict';

angular.module('castifiApp')
  .controller('ActorCtrl', function ($scope, $http, socket, Auth, User, $state) {
		
	 $scope.actor = {};
	 $scope.user = User.get();
     $scope.getCurrentUser = Auth.getCurrentUser;
     var user_id = $scope.getCurrentUser()._id;

     // console.log(Actor)
     //initial post create actor profile object id
     //we need to get profile actor id associated with the user_id of current user
     $http.get('/api/actors', {ownedBy:user_id})
     	.success(function(data){
     		console.log(data); 
     	});
     //subsequent updates will reference that id
	
	 // console.log($scope.actor) 
	 // console.log($scope.actor.id)    	   	

       $scope.register = function register(form) {
       		 $scope.actor.ownedBy = user_id;
            $scope.submitted = true;
            console.log(form)
	         $http.post('/api/actors/', $scope.actor)
	            .success(function() {
	                  if($state.is('actor.basic')){ $state.go('actor.facial')};
	                  if($state.is('actor.facial')){ $state.go('actor.enhancements')};
	                  if($state.is('actor.enhancements')){ $state.go('actor.niche')};	                 
	              });

        };


  });
