(function() {
  var userControllers = angular.module('userControllers', ['ngRoute']);

  // index controller
  userControllers.controller('newUserController', ['User', "$http", "$scope", function(User, $http, $scope) {
      this.createUser = function(){
          var user = {
              username: $scope.user.username,
              pass: $scope.user.password
          }
         console.log(user)

          User.save({}, {name: user.username, pass: user.pass}, function(user){
              console.log(user);
           })
      }
    // this.sources = Source.query();
  }]);


})();
