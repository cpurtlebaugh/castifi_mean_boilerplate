'use strict';

angular.module('castifiApp')
  .controller('ActorCtrl', function ($scope, $http, socket, Auth, User, $state,
    Actor, $filter, currentUser) {

     $scope.actor = currentUser.actorId;
	   $scope.user = User.get();
     $scope.getCurrentUser = Auth.getCurrentUser;
     var user_id = $scope.getCurrentUser()._id;

      if(currentUser.actorId  !== undefined){
        $scope.actor.dob = new Date($scope.actor.dob) 
      }

     $scope.register = function register(form) {
           $scope.submitted = true;
	         if(form.$valid){ 

                if(currentUser.actorId === undefined){
                        new Actor($scope.actor)
                            .$save(function(data){
                                $http.put('/api/users/' + user_id, {actorId: data._id})
                                if($state.is('actor.overview')){ $state.go('actor.physical')};
                                if($state.is('actor.physical')){ $state.go('actor.wardrobe')};
                                if($state.is('actor.wardrobe')){ $state.go('actor.confirmation')};
                            });
                   }
                   else{
                          Actor.update({id: $scope.actor._id }, $scope.actor,
                            function success(data){
                              console.log(data)
                               if($state.is('actor.overview')){ $state.go('actor.physical')};
                               if($state.is('actor.physical')){ $state.go('actor.wardrobe')};
                                if($state.is('actor.wardrobe')){ $state.go('actor.confirmation')};
                          }),
                          function error(){
                            $state.go('actor.overview')
                          }
                    }

            }
        };

  });
