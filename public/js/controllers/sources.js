(function() {
  var sourceControllers = angular.module('sourceControllers', ['ngRoute']);

  // index controller
  // var sources = {}
  // function getSources(){
  //     $http.get("/currentUser").then(function(response){
  //          Source.query({userId: response.data}, function(sources){
  //              sources = sources;
  //          });
  //     })
  //     console.log(sources);
  // }
  // getSources();
  sourceControllers.controller('sourcesController', ['Source', '$http', function(Source, $http) {
        var self = this;
        //self.sources = sources;
        self.sources = {};
        $http.get("/currentUser").then(function(response){
             Source.query({userId: response.data}, function(sources){
                 self.sources = sources;
             });
        });
        // 
        // this.edit = function(){
        //
        // //
        // }
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
  // grumbleControllers.controller('editGrumbleController', ["$location","$routeParams", 'Grumble', function($location, $routeParams, Grumble){
  //   this.grumble = Grumble.get({$id: $routeParams.id});
  //   this.update = function(){
  //     this.grumble.$save();
  //     $location.path("/grumbles/" + this.grumble.$id);
  //   };
  // }]);
})();
