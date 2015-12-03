'use strict';

angular.module('castifiApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, $state) {

    $scope.toggleNav = function(){
        $('.row-offcanvas').toggleClass('active').toggleClass('hidden-xs');
    }

    $scope.menu = [{
      'title': 'Edit Profile',
      'link': '/actor/overview'
       }
    ];
    $scope.close = function(state){
      $state.go(state);
      $('.row-offcanvas').toggleClass('active').toggleClass('hidden-xs');
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
