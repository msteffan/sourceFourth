(function() {
  var sourceControllers = angular.module('sourceControllers', ['ngRoute']);

  // index controller
  sourceControllers.controller('sourcesController', ['Source', '$http', function(Source, $http) {
        var self = this;
        self.sources = {};
        $http.get("/currentUser").then(function(response){
             Source.query({userId: response.data}, function(sources){
                 self.sources = sources;
                 $('.honeycombs').honeycombs({
                     combWidth:200,
                     margin: -20,
                     threshold: 3
                 });

             });
        });
        //
        this.edit = function(){
            this.source = Source.get({$id: $routeParams.id});
            this.update = function(){
              this.source.$save();
              //$location.path("/grumbles/" + this.grumble.$id);
            };
        }
        // self.getSources = function(){
        //     $http.get("/currentUser").then(function(response){
        //          Source.query({userId: response.data}, function(sources){
        //              self.sources = sources;
        //          });
        //      }
        // }
        this.create = function(){
            $(".modal").hide();
            $(".modal-backdrop").hide();
            var poodle = this;
            $http.get("/currentUser").then(function(response){
                var source = {
                    name: poodle.source.name,
                    profession: poodle.source.profession,
                    location: poodle.source.location,
                    email: poodle.source.email,
                    phone: poodle.source.phone,
                    other: poodle.source.other,
                    userId: response.data
                }

                Source.save(source, function(source) {
                    $http.get("/currentUser").then(function(response){
                        Source.query({userId: response.data}, function(sources){
                            self.sources = sources;
                        });
                     })
                })
            });

        }

        this.delete = function(id){
          $(".modal-backdrop").hide();
          Source.delete({id: id}, function(){
              $http.get("/currentUser").then(function(response){
                  Source.query({userId: response.data}, function(sources){
                      self.sources = sources;
                  });
              })
          });
        };

    }]);

  // // edit form controller (handles update)
  sourceControllers.controller('editSourceController', ["$location","$routeParams", 'Source', function($location, $routeParams, Source){

  }]);
})();
