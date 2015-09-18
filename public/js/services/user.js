(function() {
  var userServices = angular.module('userServices', ['ngResource']);

  userServices.factory('User', ['$resource', function($resource) {
    return $resource('https://sourcefourth.herokuapp.com/:id', { username: '@username', password:'@password'}, {
      update: {method:'PUT'}
    });
  }]);
})();


//{ name: '@username', pass: '@password' }
