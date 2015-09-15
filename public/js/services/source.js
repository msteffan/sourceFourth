(function() {
  var sourceServices = angular.module('sourceServices', ['ngResource']);

  sourceServices.factory('Source', ['$resource', function($resource) {
    return $resource('http://localhost:3000/sources/:id', { name: '@name', profession:'@profession', location: '@location', userId: '@userId'}, {
      update: {method:'PUT'}
    });
  }]);
})();
