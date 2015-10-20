'use strict';

angular.module('castifiApp')
  .controller('ActorCtrl', function ($scope, $http, socket, Auth, User, $state,
    Actor, $filter, currentUser, currentActor) {

    //navbar profile/edit profile
    //needs to take actor or producer to their profile
    //know the difference//grab the same profileId//but return different objects
    //but go to different forms
    //or just change navbar link view based on "role" like "admin"
    //currentUser.profession === 'actor'

    //create Actor object, attach currentUser id in ownedBy

    //get User id and put into $stateParams
    //use the params to grab ownedBy on the backend

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

         $scope.register = function register(form) {
               $scope.submitted = true;
               if(form.$valid){                 
                    if(actorLocal){
                          Actor.update({id: actorLocal }, $scope.actor,
                                function success(data){
                                   if($state.is('actor.overview')){ $state.go('actor.physical')};
                                   if($state.is('actor.physical')){ $state.go('actor.wardrobe')};
                                   if($state.is('actor.wardrobe')){ $state.go('confirmation')};
                              }),
                              function error(){
                                $state.go('actor.overview')
                              }
                            
                       }
                    

                }
            };

  });
