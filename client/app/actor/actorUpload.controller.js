'use strict';

angular.module('castifiApp')
  .controller('ActorUploadCtrl', function ($scope, $http, socket, Auth, User, $state,
    Actor, $filter, Upload, $timeout, currentUser, currentActor) {

     $scope.actor = currentUser.actorId;
	   $scope.user = User.get();
     $scope.getCurrentUser = Auth.getCurrentUser;
     var user_id = $scope.getCurrentUser()._id;
     var actorLocal = localStorage.getItem("actorLocal");
     if($scope.actor === undefined){
         $scope.actorId = localStorage.getItem("actorLocal");
     }
     else{
       $scope.actorId = $scope.actor._id
     }
    
      // console.log($scope.actorId)
      // console.log($scope.actor._id)

       $scope.uniqueString = function() {
                var text     = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                for( var i=0; i < 8; i++ ) {
                  text += possible.charAt(Math.floor(Math.random() * possible.length));
                }
                return text;
        }


          $scope.uploadFiles = function(file, errFiles, type) {
            console.log('first')
                  if (type === 'headShot'){
                    $scope.type = {headShot: "https://s3-us-west-1.amazonaws.com/actortest/" + file.name}
                  }
                  else if (type === 'headToToe'){
                    $scope.type = {headToToe: "https://s3-us-west-1.amazonaws.com/actortest/" + file.name}
                  }
                  else if (type === 'realLife'){
                    $scope.type = {realLife: "https://s3-us-west-1.amazonaws.com/actortest/" + file.name}
                  }
                  console.log($scope.type)
                  $scope.f = file;

                  $scope.errFile = errFiles && errFiles[0];
                  if (file) {
                      file.upload = Upload.upload({
                          url: 'api/actors/uploads',
                          data: {file: file}
                      });

                      file.upload.then(function (response) {
                          $timeout(function () {
                              file.result = response.data;
                          });
                      }, function (response) {
                          if (response.status > 0)
                              $scope.errorMsg = response.status + ': ' + response.data;
                      }, function (evt) {
                          file.progress = Math.min(100, parseInt(100.0 *
                                                   evt.loaded / evt.total));
                      });
                  }

                  //updates the Actor model with photo
                  //watch for changes on photo attribute and update view

                   Actor.update({id: $scope.actorId },
                    $scope.type,
                      function success(data){
                        console.log(data)
                        $state.go('actor.edit.photos',{reload:true})
                      }),
                      function error(){

                      }



              }

  });
