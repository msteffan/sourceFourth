(function() {
  var sourceServices = angular.module('sourceServices', ['ngResource']);

  sourceServices.factory('Source', ['$resource', function($resource) {
    return $resource('https://sourcefourth.herokuapp.com/:id', { name: '@name', profession:'@profession', location: '@location', email: '@email', phone: '@phone', other: "@other", userId: '@userId'}, {
      update: {method:'PUT'}
    });
  }]);
})();
