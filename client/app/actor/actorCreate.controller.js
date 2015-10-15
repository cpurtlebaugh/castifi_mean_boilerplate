'use strict';

angular.module('castifiApp')
  .controller('ActorCreateCtrl', function ($scope, $http, socket, Auth, User, $state,
    Actor, $filter, currentUser, currentActor) {


     $scope.actor = currentUser.actorId;
	   $scope.user = User.get();
     $scope.getCurrentUser = Auth.getCurrentUser;
     $scope.user = $scope.getCurrentUser();
     var user_id = $scope.getCurrentUser()._id;

      
     $scope.createActor = function createActor() {
            console.log("register")          
            if(currentUser.actorId === undefined){
                    new Actor($scope.actor)
                        .$save(function(data){
                              $http.put('/api/users/' + user_id, {actorId: data._id})
                              localStorage.setItem("actorLocal", data._id)
                              $state.go('actor.overview')
                              console.log("working")
                        });
            }
            else{
                  console.log("not working")
            }

        };

  

  });
