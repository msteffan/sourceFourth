(function() {
  var userControllers = angular.module('userControllers', ['ngRoute']);

  // create new user controller
  userControllers.controller('newUserController', ['User', "$http", "$scope", function(User, $http, $scope) {
      this.createUser = function(){
          var user = {
              username: $scope.user.username,
              password: $scope.user.password
          }
          User.save({}, {username: user.username, password: user.password}, function(user){
          })
      }
      this.authenticate = function(){
          var user = {
              username: $scope.user.username,
              password: $scope.user.password
          }
          $http.post("/signup", {username: user.username, password: user.password}).then(function(response){
            })

        }
    //  }
  }]);






})(); // closes iife
