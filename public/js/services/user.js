(function() {
  var userServices = angular.module('userServices', ['ngResource']);

  userServices.factory('User', ['$resource', function($resource) {
    return $resource('http://localhost:3000/users/:id', { name: '@name', pass:'@pass'}, {
      update: {method:'PUT'}
    });
  }]);
})();


//{ name: '@username', pass: '@password' }
