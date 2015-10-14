'use strict';

angular.module('castifiApp')
  .controller('ActorNavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Overview',
      'link': '/actor/overview'
    },{
      'title': 'Physical Appearance',
      'link': '/actor/basic'},
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