'use strict';

angular.module('castifiApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'ngFileUpload',
  'ngImgCrop',
  'validation.match',
  'ngAutocomplete',
  'smart-table'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        if(response.status === 403){
          $location.path('/profile');
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth, $state) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      document.body.scrollTop = document.documentElement.scrollTop = 0;

      //if user tries to access admin routes (as non admin) auth.IsAdmin
      //redirect to root

      //need to check role with each statechange and redirect accordingly
      //add data authorization roles to each route
      //can also check if they came from login or signup

      //check signup and login, if user logged in
      //redirect to root

      //change state data, if user next.data.role doesn't match currentUser.role
      //bounce back to login

      //redirect logged in users away from signup/login
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          //if user isn't authenticated //user permissions by role
          event.preventDefault();
          $location.path('/login');
        }
      });
    });
  });
