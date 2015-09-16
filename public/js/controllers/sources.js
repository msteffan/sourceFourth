(function() {
  var sourceControllers = angular.module('sourceControllers', ['ngRoute']);

  // index controller
  sourceControllers.controller('sourcesController', ['Source', '$http', function(Source, $http) {
    var self = this;
        self.sources = {};
        $http.get("/currentUser").then(function(response){
             Source.query({userId: response.data}, function(sources){
                 self.sources = sources;
             });
        });
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
  sourceControllers.controller('newSourceController', ["$location", 'Source', '$http', function($location, Source, $http){
        this.create = function(){
            var self = this;
            $http.get("/currentUser").then(function(response){
                if(self.source.name === "" || self.source.profession === "" || self.source.location === ""){
                    return
                }
                var source = {
                    name: self.source.name,
                    profession: self.source.profession,
                    location: self.source.location,
                    userId: response.data
                }
                console.log(source);

                Source.save(source, function(source) {
                })
            });

        }
  }])
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
