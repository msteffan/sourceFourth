(function() {
  var sourceControllers = angular.module('sourceControllers', ['ngRoute']);

  // index controller
  sourceControllers.controller('sourcesController', ['Source', function(Source) {
      console.log("i'm here")
    // this.sources = Source.query();
  }]);

  // // show controller (handles delete link on show page)
  // grumbleControllers.controller('grumbleController', ['$routeParams','$location', 'Source','Comment', function($routeParams, $location, Source, Comment){
  // //   this.grumble = Grumble.get({$id: $routeParams.id}, function(grumble){
  // //     grumble.comments = Comment.query({grumbleId: $routeParams.id});
  // //   });
  // //   this.delete = function(id){
  // //     Grumble.delete({$id: id}, function(){
  // //       $location.path("/grumbles");
  // //     });
  // //   };
  // //   this.createComment = function(comment){
  // //     var self = this;
  // //     // todo: move comment support to firebase
  // //     // Comment.save({grumbleId: $routeParams.id},comment, function(comment){
  // //     //   self.grumble.comments.push(comment);
  // //     //   self.comment = {};
  // //     // });
  // //   };
  // }]);
  // // new controller
  // grumbleControllers.controller('newSourceController', ["$location", 'Source', function($location, Source){
  //   this.create = function(){
  //     Source.save(this.source, function(source) {
  //         console.log(source);
  //       //$location.path("/grumbles/" + grumble.id);
  //     })
  //   }
  //
  // }])
  // //
  // // edit form controller (handles update)
  // grumbleControllers.controller('editGrumbleController', ["$location","$routeParams", 'Grumble', function($location, $routeParams, Grumble){
  //   this.grumble = Grumble.get({$id: $routeParams.id});
  //   this.update = function(){
  //     this.grumble.$save();
  //     $location.path("/grumbles/" + this.grumble.$id);
  //   };
  // }]);
})();
