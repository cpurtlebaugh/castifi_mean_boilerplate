'use strict';

describe('Controller: ActorCtrl', function () {

var ActorCtrl, scope, $httpBackend, User, Actor, currentUser;
var mockUsersSvc = {}
  // load the controller's module
  beforeEach(module('castifiApp'));


  beforeEach(inject(function ($q) {
    mockUsersSvc.fetch = function () {
      var deferred = $q.defer()
      deferred.resolve([
        {email: 'bobby@bobby.com'}
      ])
      return deferred.promise
    }
    mockUsersSvc.create = function () {
      var deferred = $q.defer()
      deferred.resolve()
      return deferred.promise
    }
  }))



  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {
    scope = $rootScope.$new();
    User = User;
    currentUser = currentUser;
    Actor = Actor;

    ActorCtrl = $controller('ActorCtrl', {
      User: mockUsersSvc,
      $scope: scope,
      $User: User,
      Actor: Actor,
      currentUser: mockUsersSvc
    });
  }));

  it('should ...', function () {
    expect(scope.title).toEqual('hellow guys');
  });

  it('should return one user', function () {
    scope.$digest();

    expect(scope.email).to.have.length(1);
  });

  // it('should ...', function () {
  //   expect(currentUser).toEqual({});
  //   console.log(currentUser)
  //   console.log('herro')
  // });
});
