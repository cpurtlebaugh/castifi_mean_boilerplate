'use strict';

angular.module('castifiApp')
  .controller('ActorUploadCtrl', function ($scope, $http, socket, Auth, User, $state,
    Actor, $filter, Upload, $timeout, currentPerson) {

     $scope.actor = currentPerson.actorId;
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
    


  $scope.submit = function() {
     if (form.file.$valid && $scope.file && !$scope.file.$error) {
       $scope.upload($scope.file);
     }
   };

  $scope.uploadFiles = function(file, errFiles) {
        console.log(file)
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
      
          //watch for changes on photo attribute and update view
           Actor.update({id: $scope.actor._id }, {photo: "https://s3-us-west-1.amazonaws.com/actortest/" + file.name},
              function success(data){
                console.log(data)
                $state.go('actor.photos',{reload:true})
              }),
              function error(){
      
              }



      }


  // $scope.sizeLimit      = 10585760; // 10MB in Bytes
  // $scope.uploadProgress = 0;
  // $scope.creds          = {};

  // $scope.creds.access_key = ''
  // $scope.creds.secret_key =  ''
  // $scope.creds.bucket = 'actortest'

  // $scope.basicUrl = ''
  // $scope.photo = '';

  // $scope.upload = function() {
  //   AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
  //   AWS.config.region = 'us-west-1';
  //   var bucket = new AWS.S3({ params: { Bucket: $scope.creds.bucket } });

  //   if($scope.file) {
  //       // Perform File Size Check First
  //       var fileSize = Math.round(parseInt($scope.file.size));
  //       if (fileSize > $scope.sizeLimit) {
  //         console.log('Sorry, your attachment is too big. <br/> Maximum '  + $scope.fileSizeLabel() + ' file attachment allowed','File Too Large');
  //         return false;
  //       }
  //       // Prepend Unique String To Prevent Overwrites
  //       var uniqueFileName = $scope.uniqueString() + '-' + $scope.file.name;
  //       console.log(uniqueFileName)
  //       var params = { Key: uniqueFileName, ContentType: $scope.file.type, Body: $scope.file, ServerSideEncryption: 'AES256' };

  //       bucket.putObject(params, function(err, data) {
  //         console.log(params)
  //         console.log($scope.basicUrl + uniqueFileName);
  //         $scope.photo = $scope.basicUrl + uniqueFileName;
  //         console.log(data)
  //         if(err) {
  //           console.log(err.message,err.code);
  //           return false;
  //         }
  //         else {
  //           // Upload Successfully Finished
  //           console.log('File Uploaded Successfully', 'Done');

  //           // Reset The Progress Bar
  //           setTimeout(function() {
  //             $scope.uploadProgress = 0;
  //             $scope.$digest();
  //           }, 4000);
  //         }
  //       })
  //       .on('httpUploadProgress',function(progress) {
  //         $scope.uploadProgress = Math.round(progress.loaded / progress.total * 100);
  //         $scope.$digest();
  //       });
  //     }
  //     else {
  //       // No File Selected
  //       console.log('Please select a file to upload');
  //     }
  //   }


  //       $scope.fileSizeLabel = function() {
  //         // Convert Bytes To MB
  //         return Math.round($scope.sizeLimit / 1024 / 1024) + 'MB';
  //       };


  //       $scope.uniqueString = function() {
  //         var text     = "";
  //         var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  //         for( var i=0; i < 8; i++ ) {
  //           text += possible.charAt(Math.floor(Math.random() * possible.length));
  //         }
  //         return text;
  //       }

  });
