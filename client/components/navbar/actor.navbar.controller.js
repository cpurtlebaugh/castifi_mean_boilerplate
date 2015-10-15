'use strict';

angular.module('castifiApp')
  .controller('ActorNavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [
    {
      'title': 'Photos',
      'link': '/actor/photos'
    },
    {
      'title': 'Overview',
      'link': '/actor/overview'
    },
    {
      'title': 'Appearance',
      'link': '/actor/physical'
    },
    {
      'title': 'Wardrobe',
      'link': '/actor/wardrobe'
    },
    {
      'title': 'Skills',
      'link': ''
     },
     {
      'title': 'Props',
      'link': ''
     }
    ];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
