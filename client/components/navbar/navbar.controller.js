'use strict';

angular.module('castifiApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, $state) {

    // $scope.hideNav = true;

    $scope.toggleNav = function(){
    $scope.menuIcon = false;
    $scope.closeIcon = false;
    console.log('start menu icon');
    console.log($scope.menuIcon);
    $('.row-offcanvas').toggleClass('active').toggleClass('hidden-xs');
    }

    $scope.menu = [{
      'title': 'Edit Profile',
      'link': '/actor/overview'
       }
    ];

    $scope.close = function(state){
      $state.go(state);
      // $scope.hideNav = !$scope.hideNav;
      $('.row-offcanvas').toggleClass('active').toggleClass('hidden-xs');
    };

    // $scope.menuClose = function(){
    //   if ($scope.menuIcon) {
    //     return true;
    //   } else{
    //     return false;
    //   }

    // };

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



