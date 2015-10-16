'use strict';

angular.module('castifiApp')
  .controller('ActorCreateCtrl', function ($scope, $http, Auth, User, $state,
    Actor, currentUser, currentActor) {


	   // $scope.user = User.get();
     $scope.getCurrentUser = Auth.getCurrentUser;
     $scope.user = $scope.getCurrentUser();
     var user_id = $scope.getCurrentUser()._id;

     // console.log('user')
     // console.log($scope.user)
     // console.log('getCurrentUser')
     // console.log($scope.getCurrentUser())
     // console.log('currentUser')
     // console.log(currentUser)
     // console.log('currentActor Id')
     // console.log(currentActor.data._id)
     // console.log(user_id)
     // console.log($scope.user._id)
     // console.log($scope.getCurrentUser()._id)

     
     $scope.createActor = function createActor() {         
            if(currentUser.actorId === undefined){
                    new Actor($scope.actor)
                        .$save(function(data){
                              console.log("data")
                              console.log(data)
                              $http.put('/api/users/' + user_id, {actorId: data._id});
                              localStorage.setItem("actorLocal", data._id);
                              $state.go('actor.photos')
                        });
            }
            else{
                  console.log("not working")
            }

        };

  

  });
