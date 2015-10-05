'use strict';

angular.module('castifiApp')
  .controller('ProfileCtrl', function ($scope, $http, socket, Auth, User, $state, 
    Actor, currentActor, $filter) {

      $scope.getCurrentUser = Auth.getCurrentUser;
      $scope.user = $scope.getCurrentUser();
      $scope.user.dob = new Date($scope.getCurrentUser().dob)
      var user_id = $scope.getCurrentUser()._id;
      var actor = $filter('filter')(currentActor.data, { ownedBy: user_id});
      var actor = actor[0]
      //need to grab currentActor to make sure they haven't created a profile
      //Actor is the resource service
   
    
      $scope.submitted = false;

      // console.log($scope.getCurrentUser().dob)
      // console.log(typeof($scope.getCurrentUser().dob))
       
       //function to update the basic user information
       $scope.register = function register(form) {
            $scope.submitted = true;
               
             $http.put('/api/users/' + user_id, $scope.user )
                .success(function() {
                      if($state.is('profile.basic')){ $state.go('profile.personal')};
                      if($state.is('profile.personal')){ $state.go('profile.address')};
                      if($state.is('profile.address')){ $state.go('profile.confirmation')};
                  });
        };


        // console.log(actor.id)
        //function to create the extended actor profile
        $scope.createProfile = function createProfile(){
              //need to disable once they have created a new profile
                if(actor === undefined){
                  new Actor({ownedBy: user_id})
                      .$save(function(data){
                          // $http.put('/api/users/' + user_id, {profileId: data._id})
                          console.log(data)
                          $state.go('actor.home');
                      });
                 }
                 else{
                   $state.go('actor.home')
                   console.log("booyah")
                 }
        }

  });
