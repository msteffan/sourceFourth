(function() {
  var sourceServices = angular.module('sourceServices', ['ngResource']);

  sourceServices.factory('Source', ['$resource', function($resource) {
    return $resource('http://localhost:3000/contacts/:id', {}, {
      update: {method:'PUT'}
    });
  }]);
})();
