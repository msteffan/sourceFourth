(function(){
  var directives = angular.module('sourceDirectives',[]);
  directives.directive('showSource', function(){
      return {
          templateUrl: "js/views/sources/_source_show.html",
          replace: false,
          link: function(scope){

          }
      }

  });
  directives.directive('editSource', function(){
      return {
          templateUrl: "js/views/sources/_source_edit.html",
          replace: true,
          link: function(scope){

          }
      }

  });
})();
