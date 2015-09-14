(function() {
  var userControllers = angular.module('userControllers', ['ngRoute']);

  // create new user controller
  userControllers.controller('newUserController', ['User', "$http", "$scope", function(User, $http, $scope) {
      this.createUser = function(){
          var user = {
              username: $scope.user.username,
              pass: $scope.user.password
          }
          User.save({}, {name: user.username, pass: user.pass}, function(user){

           })
      }
  }]);






})(); // closes iife
