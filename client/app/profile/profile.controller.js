'use strict';

angular.module('castifiApp')
  .controller('ProfileCtrl', function ($scope, $http, socket, Auth, User, $state, 
    Actor, $filter) {

      $scope.actor = {}
      $scope.getCurrentUser = Auth.getCurrentUser;
      $scope.user = $scope.getCurrentUser();
      var user_id = $scope.getCurrentUser()._id;
   
      $scope.submitted = false;
      if($scope.user.actorId !== undefined){
        $scope.actor = $scope.user.actorId;
        $scope.actor.dob = new Date($scope.user.actorId.dob) 
      }

      console.log("scope user actorId")
      console.log($scope.user.actorId)

        //function to create the extended actor profile
        $scope.createProfile = function createProfile(form){
               $scope.submitted = true
               if(form.$valid){    
                //disable once they have created a new profile
                  if($scope.user.actorId === undefined){
                        new Actor($scope.actor)
                            .$save(function(data){
                                $http.put('/api/users/' + user_id, {actorId: data._id})
                                console.log(data)
                                if($state.is('profile.basic')){ $state.go('profile.personal')};
                            });
                   }
                   else{
                          Actor.update({id: $scope.actor._id }, $scope.actor, 
                                  function success(data){
                                    console.log(data)
                                    console.log($state.$current)
                                     if($state.is('profile.basic')){ $state.go('profile.personal')};
                                     if($state.is('profile.personal')){ $state.go('profile.address')};
                                     if($state.is('profile.address')){ $state.go('profile.confirmation')};
                                  }),
                                  function error(){
                                     console.log("update error")
                                  }                   
                   }
                }

          }

  });
