(function(){
  var directives = angular.module('sourceDirectives',[]);
  directives.directive('showSource', function(){
      return {
          templateUrl: "js/views/sources/_source_show.html",
          replace: true,
          link: function(scope){

          }
      }

  });
})();
