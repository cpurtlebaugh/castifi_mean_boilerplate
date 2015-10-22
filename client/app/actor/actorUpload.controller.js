'use strict';

angular.module('castifiApp')
  .controller('ActorUploadCtrl', function ($scope, $http, socket, Auth, User, $state,
    Actor, Upload, $timeout, currentUser) {

       $scope.getCurrentUser = Auth.getCurrentUser;
       $scope.user = $scope.getCurrentUser();
       var user_id = $scope.getCurrentUser()._id;
       $scope.actor = $scope.user.actorId
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
              console.log(type)
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
                  console.log($scope.type)
            
                  Actor.update({id: $scope.actor._id }, $scope.type,
                          function success(data){
                            console.log("working")
                            console.log(data)
                            $state.go('actor.edit.photos',{reload:true})
                          }),
                          function error(){

                          }
          }


        $scope.takeFiles = function(file, errFiles, type) {
            //assign to $scope
            $scope.file = file;
            $scope.errFiles = errFiles;
            $scope.photoType = type
            console.log(file)
            console.log(errFiles)
            console.log(type)
          }

         // $scope.submit = function() {
         //    if ($scope.file) {
         //      console.log($scope.file);
         //      $scope.uploadFiles($scope.file, [], 'realLife')
         //    }
         //  };


          $scope.uploadFiles = function(file, errFiles, type) {
            // $scope.file.$ngfDataUrl = file
            // $scope.file.type = "image/png"
            console.log(file)
            // console.log($scope.file)
            // console.log($scope.errFiles)
            // console.log($scope.type)
            // console.log(Upload.dataUrltoBlob(file))
            // console.log($scope.file.$ngfBlobUrl)
            // var file = $scope.file;
            // var errFiles = $scope.errFiles;
            // var type = $scope.photoType;

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

                   Actor.update({id: $scope.actor._id },
                    $scope.type,
                      function success(data){
                        console.log(data)
                        $state.go('actor.edit.photos',{reload:true})
                      }),
                      function error(){

                      }



              }

  });
