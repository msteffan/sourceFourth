(function() {
  var userControllers = angular.module('userControllers', ['ngRoute']);

  // create new user controller
  userControllers.controller('newUserController', ['User', "$http", "$scope", function(User, $http, $scope) {
      this.createUser = function(){
          var user = {
              username: $scope.user.username,
              password: $scope.user.password
          }
          console.log(user);

          User.save({}, {username: user.username, password: user.password}, function(user){
              console.log(user);
          })
      }
      this.authenticate = function(){
          var user = {
              username: $scope.user.username,
              password: $scope.user.password
          }
          console.log(user);
          $http.post("/signup", {username: user.username, password: user.password}).then(function(response){
                console.log(response);
            })

        }
    //  }
  }]);






})(); // closes iife
