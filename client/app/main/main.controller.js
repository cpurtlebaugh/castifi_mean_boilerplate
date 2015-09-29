'use strict';

angular.module('castifiApp')
  .controller('MainCtrl', function ($scope, $http, socket, Auth) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    // $http.get('/api/users').success(function(awe) {
    //   $scope.awe = awe;
    //   socket.syncUpdates('users', $scope.awe);
    //   console.log(awe)
    // });


    // $http.get('/api/users/me').success(function(awesome) {
    //   $scope.awesome = awesome;
    //   socket.syncUpdates('users', $scope.awesome);
    //   console.log($scope.awesome._id)
    // });



    //  $scope.updateThing = function() {
    //   var newProfile = { user: $scope.awesome,
    //                      name: $scope.awesome.name,
    //                      email: $scope.awesome.email}
    //   $http.post('/api/profiles/', newProfile);
    //   console.log(newProfile)
    // };


    //   $scope.getCurrentUser = Auth.getCurrentUser;
    //   var user_id = $scope.getCurrentUser()._id;

    //  $scope.updateUser = function() {
    //   $http.put('/api/users/' + user_id, {name: "TED"} );
    // };


    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
