'use strict';

angular.module('castifiApp')
  .controller('ActorUploadCtrl', function ($scope, $http, socket, Auth, User, $state,
    Actor, $filter, currentPerson) {

     $scope.actor = currentPerson.actorId;
     $scope.user = User.get();
     $scope.getCurrentUser = Auth.getCurrentUser;
     $scope.message = 'AwesomeSauce'
     var user_id = $scope.getCurrentUser()._id;

     console.log('test')

    var s3upload = s3upload != null ? s3upload : new S3Upload({
      file_dom_selector: '#files',
      s3_sign_put_url: '/signS3put',
      onProgress: function(percent, message) { // Use this for live upload progress bars
        console.log('Upload progress: ', percent, message);
      },
      onFinishS3Put: function(public_url) { // Get the URL of the uploaded file
        console.log('Upload finished: ', public_url);
      },
      onError: function(status) {
        console.log('Upload error: ', status);
      }
    });

  });
