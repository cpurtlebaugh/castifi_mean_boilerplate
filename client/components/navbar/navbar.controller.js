'use strict';

angular.module('castifiApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, panels) {
    $scope.menu = [{
      'title': 'Edit Profile',
      'link': '/actor/overview'
       }
    ];

    // $scope.message = 'i am opening yay!'

    //     $scope.$on('leftHello', function(event, args) {

    //     // $scope.message = args.message;

    //     panels.open("test01");
    //   });

    $scope.leftOpen = function () {
        // $scope.$broadcast('leftHello', {message : $scope.message});
        panels.open("test01");
      };





    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;


    $scope.user = $scope.getCurrentUser();
    $scope.actor = $scope.user.actorId

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
