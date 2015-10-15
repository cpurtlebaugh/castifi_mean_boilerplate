'use strict';

angular.module('castifiApp')
  .controller('ActorCtrl', function ($scope, $http, socket, Auth, User, $state,
    Actor, $filter, currentUser, currentActor) {


       // $scope.user = User.get();
       $scope.getCurrentUser = Auth.getCurrentUser;
       $scope.user = $scope.getCurrentUser();
       var user_id = $scope.getCurrentUser()._id;
      // if(currentUser.actorId  !== undefined){
      //   $scope.actor.dob = new Date($scope.actor.dob) 
      // }

       if($scope.user.actorId === undefined){ 
          $scope.actor = {};
        }
        else{
           $scope.actor = $scope.user.actorId
           $scope.actor.dob = new Date($scope.actor.dob) 
        }

        var actorLocal = localStorage.getItem("actorLocal");
        console.log(actorLocal)

        console.log("scope user")
        console.log($scope.user.actorId)
        console.log("scope actor")
        console.log($scope.actor)

         $scope.register = function register(form) {
               $scope.submitted = true;
               if(form.$valid){                 
                    if(actorLocal){
                          Actor.update({id: actorLocal }, $scope.actor,
                                function success(data){
                                  console.log(data)
                                   if($state.is('actor.overview')){ $state.go('actor.physical')};
                                   if($state.is('actor.physical')){ $state.go('actor.wardrobe')};
                                   if($state.is('actor.wardrobe')){ $state.go('actor.confirmation')};
                              }),
                              function error(){
                                console.log("error")
                                $state.go('actor.overview')
                              }
                            
                       }
                    

                }
            };

  });
