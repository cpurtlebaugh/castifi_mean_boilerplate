'use strict';

angular.module('castifiApp')
  .controller('ActorUploadCtrl', function ($scope, $http, socket, Auth, User, $state,
    Actor, $filter, Upload, $timeout, currentUser) {

     $scope.actor = currentUser.actorId;
	   $scope.user = User.get();
     $scope.getCurrentUser = Auth.getCurrentUser;
     var user_id = $scope.getCurrentUser()._id;

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
                  // console.log("file")
                  // console.log(file)
                  // console.log($scope.headShot)
                  // console.log(type)
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
                  // file.name = file.name + '-' + $scope.uniqueString()
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

                   Actor.update({id: $scope.actor._id },
                    $scope.type,
                      function success(data){
                        console.log(data)
                        $state.go('actor.photos',{reload:true})
                      }),
                      function error(){

                      }



              }

  });
