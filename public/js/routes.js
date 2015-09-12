(function(){
  var router = angular.module('contactRouter', []);
  router.config([
    '$routeProvider',
    function($routeProvider){
      $routeProvider.
      when("/contacts", {
        templateUrl: 'views/contacts/index.html',
        controller: 'contactsController',
        controllerAs: 'contactsCtrl'
      }).
      when("/contacts/new", {
        templateUrl: 'views/contacts/new.html',
        controller: 'newcontactController',
        controllerAs: 'newcontactCtrl'
      }).
      when("/contacts/:id", {
        templateUrl: 'views/contacts/show.html',
        controller: 'contactController',
        controllerAs: 'contactCtrl'
      }).
      when("/contacts/:id/edit", {
        templateUrl: 'views/contacts/edit.html',
        controller: 'editcontactController',
        controllerAs: 'contactCtrl'
      }).
      otherwise({
        redirectTo: "/contacts"
      })
    }
  ])


})();
