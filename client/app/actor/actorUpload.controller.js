'use strict';

angular.module('castifiApp')
  .controller('ActorUploadCtrl', function ($scope, $http, socket, Auth, User, $state,
    Actor, Upload, $timeout, currentUser, $rootScope) {

       $scope.user = currentUser;
       $scope.actor = $scope.user.actorId
       $scope.errMsg = null;
       $scope.dynamic = 0;

       $scope.uniqueString = function() {
        var userEmail = $scope.user.email;
        var userEmailLength = $scope.user.email.length;
          var userStampTail = "dj9" + userEmail.charAt(userEmailLength - 1) + "_pE33"
              + userEmail.charAt(userEmailLength - 2) + "30O_" + userEmail.charAt(userEmailLength - 3) + "bV";
          var userStampHead = "z9r7" + userEmail.charAt(2) + "43" + userEmail.charAt(1)
              + "_dE" + userEmail.charAt(0) + "pD2";
        var userStamp = userStampTail + userStampHead
        return userStamp;
       }

        $scope.removePhoto = function removePhoto(type){
               if (type === 'headShot'){
                    // $scope.type = {headShot: null}
                    $scope.actor.headShot = null;
                    $scope.headShot = null;
                  }
                  else if (type === 'headToToe'){
                    // $scope.type = {headToToe: null}
                    $scope.actor.headToToe = null;
                    $scope.headToToe = null;
                  }
                  else if (type === 'realLife'){
                    // $scope.type = {realLife: null}
                    $scope.actor.realLife = null;
                    $scope.realLife = null;
                  }

                  Actor.update({id: $scope.actor._id }, $scope.actor,
                          function success(data){
                            $state.go('actor.edit.photos',{reload:true})
                          }),
                          function error(){

                          }
          }



          $scope.uploadFiles = function(file, errFiles, type) {
                  console.log(file.name)
                  if(file){
                    if (type === 'headShot'){
                      // $scope.type = {headShot: "https://s3-us-west-1.amazonaws.com/actortest/" + $scope.uniqueString() + file.name}
                      $scope.actor.headShot = "https://s3-us-west-1.amazonaws.com/actortest/" + $scope.uniqueString() + file.name
                       $scope.headShow = true;
                    }
                    else if (type === 'headToToe'){
                      // $scope.type = {headToToe: "https://s3-us-west-1.amazonaws.com/actortest/" + $scope.uniqueString()  + file.name}
                      $scope.actor.headToToe = "https://s3-us-west-1.amazonaws.com/actortest/" + $scope.uniqueString() + file.name
                         $scope.toeShow = true
                    }
                    else if (type === 'realLife'){
                      // $scope.type = {realLife: "https://s3-us-west-1.amazonaws.com/actortest/" + $scope.uniqueString() + file.name}
                      $scope.actor.realLife = "https://s3-us-west-1.amazonaws.com/actortest/" + $scope.uniqueString() + file.name
                      $scope.realShow = true;
                    }
                  }

                  $scope.f = file;
                  $scope.errFile = errFiles && errFiles[0];
                  if(errFiles.length >0){
                    if (type === 'headShot'){
                      $scope.headShow = true;
                    }
                    else if (type === 'headToToe'){
                      $scope.toeShow = true
                    }
                    else if (type === 'realLife'){
                      $scope.realShow = true;
                    }
                    $scope.errMsg = "Sorry, your file is over 2MB."
                  }
                  else{

                    $scope.errMsg = null;
                  }
                  //if there are no errors
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
                          $scope.dynamic = file.progress;
                      });
                  }


                  if(file){
                    console.log($scope.actor)
                    Actor.update({id: $scope.actor._id },
                    $scope.actor,
                      function success(data){
                        // $state.go('actor.edit.photos',{reload:true})
                      }),
                      function error(){

                      }
                  }
              }


  });
