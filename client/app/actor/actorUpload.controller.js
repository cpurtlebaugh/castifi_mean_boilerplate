'use strict';

angular.module('castifiApp')
  .controller('ActorUploadCtrl', function ($scope, $http, socket, Auth, User, $state,
    Actor, Upload, $timeout, currentUser, $rootScope) {

       $scope.user = currentUser;
       $scope.actor = $scope.user.actorId
       console.log($scope.user)
       console.log($scope.actor)

       $scope.uniqueString = function() {
                var text     = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                for( var i=0; i < 8; i++ ) {
                  text += possible.charAt(Math.floor(Math.random() * possible.length));
                }
                return text;
        }

        $scope.removePhoto = function removePhoto(type){
               if (type === 'headShot'){
                    $scope.type = {headShot: null}
                    $scope.actor.headShot = null;
                    $scope.headShot = null;
                  }
                  else if (type === 'headToToe'){
                    $scope.type = {headToToe: null}
                    $scope.actor.headToToe = null;
                    $scope.headToToe = null;
                  }
                  else if (type === 'realLife'){
                    $scope.type = {realLife: null}
                    $scope.actor.realLife = null;
                    $scope.realLife = null;
                  }
            
                  Actor.update({id: $scope.actor._id }, $scope.type,
                          function success(data){
                            $state.go('actor.edit.photos',{reload:true})
                          }),
                          function error(){

                          }
          }



          $scope.uploadFiles = function(file, errFiles, type) {
                  if (type === 'headShot'){
                    $scope.type = {headShot: "https://s3-us-west-1.amazonaws.com/actortest/" + file.name}
                    $scope.actor.headShot = "https://s3-us-west-1.amazonaws.com/actortest/" + file.name
                  }
                  else if (type === 'headToToe'){
                    $scope.type = {headToToe: "https://s3-us-west-1.amazonaws.com/actortest/" + file.name}
                    $scope.actor.headToToe = "https://s3-us-west-1.amazonaws.com/actortest/" + file.name
                  }
                  else if (type === 'realLife'){
                    $scope.type = {realLife: "https://s3-us-west-1.amazonaws.com/actortest/" + file.name}
                    $scope.actor.realLife = "https://s3-us-west-1.amazonaws.com/actortest/" + file.name
                  }

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
                        // $state.go('actor.edit.photos',{reload:true})
                      }),
                      function error(){

                      }
              }

        


  });
