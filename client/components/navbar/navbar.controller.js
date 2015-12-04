'use strict';

angular.module('castifiApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, $state, $timeout) {


    $scope.toggleNav = function(){
       angular.element('.row-offcanvas').toggleClass('active')
       angular.element('.navbar-toggle').toggleClass('hide')
    }

    $scope.close = function(state){
      $state.go(state);
      angular.element('.row-offcanvas').toggleClass('active')
      angular.element('.navbar-toggle').toggleClass('hide')
    };

     $scope.menu = [{
      'title': 'Edit Profile',
      'link': '/actor/overview'
       }
    ];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.user = $scope.getCurrentUser();
    $scope.actor = $scope.user.actorId


    $scope.logout = function() {
      Auth.logout();
      angular.element('.row-offcanvas').toggleClass('active')
      angular.element('.navbar-toggle').toggleClass('hide')
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });



