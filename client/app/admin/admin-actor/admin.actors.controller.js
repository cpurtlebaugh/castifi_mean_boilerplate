'use strict';

angular.module('castifiApp')
  .controller('AdminActorsCtrl', function ($scope, $http, Auth, User, Actor, $window, $state, $filter) {

    // Use the User $resource to fetch all users
    $scope.actors = Actor.query();
    // console.log($scope.actors)
    // console.log(typeof($scope.actors))
    $scope.users  = User.query();

    $scope.delete = function(actor) {
        var confirm = $window.confirm("Are you sure you want to permanently delete " + actor.email + " ?")

        if(confirm){
            Actor.remove({ id: actor._id });
            angular.forEach($scope.actors, function(a, i) {
              if (a === actor) {
                $scope.actors.splice(i, 1);
              }
            });
            User.remove({ id: actor.ownedBy});
        }
    }

    $scope.deactive = function(actor){
      if(actor.active === true){
        Actor.update({ id: actor._id}, {active: false}, function success(data){
          $state.reload()
        })
      }
      else {
        Actor.update({ id: actor._id}, {active: true}, function success(data){
          $state.reload()
        })
      }
    }

    // smart-table sort

    // function generateRandomItem(id) {

    //     var firstname = firstnames[Math.floor(Math.random() * 3)];
    //     var lastname = lastnames[Math.floor(Math.random() * 3)];
    //     var birthdate = dates[Math.floor(Math.random() * 3)];
    //     var balance = Math.floor(Math.random() * 2000);

    //     return {
    //         id: id,
    //         firstName: firstname,
    //         lastName: lastname,
    //         birthDate: new Date(birthdate),
    //         balance: balance
    //     }
    // }


    $scope.displayActors = [];



    //copy the references (you could clone ie angular.copy but then have to go through a dirty checking for the matches)
     $scope.displayActors = [].concat($scope.actors);
    // console.log($scope.displayActors)


    // //remove to the real data holder
    // $scope.removeItem = function removeItem(row) {
    //     var index = $scope.actorCollection.indexOf(row);
    //     if (index !== -1) {
    //         $scope.actorCollection.splice(index, 1);
    //     }
    // }


  });


