(function(){
  var router = angular.module('sourceRouter', []);
  router.config([
    '$routeProvider',
    function($routeProvider){
      $routeProvider.
      when("/sources", {
        templateUrl: 'js/views/sources/index.html',
        controller: 'sourcesController',
        controllerAs: 'sourceCtrl'
      })
      .
      when("/sources/new", {
        templateUrl: 'js/views/sources/new.html',
        controller: 'newsourceController',
        controllerAs: 'newsourceCtrl'
      }).
      when("/sources/:id", {
        templateUrl: 'js/views/sources/show.html',
        controller: 'sourceController',
        controllerAs: 'sourceCtrl'
      }).
      when("/sources/:id/edit", {
        templateUrl: 'js/views/sources/edit.html',
        controller: 'editsourceController',
        controllerAs: 'sourceCtrl'
      }).
      when("/users/new", {
        templateUrl: 'js/views/users/new.html',
        controller: 'newUserController',
        controllerAs: 'userCtrl'
      }).
      otherwise({
        redirectTo: "/sources"
      })
    }
  ])


})();
