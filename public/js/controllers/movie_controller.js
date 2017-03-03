function MovieController($scope, $http) {
  var self = this;
  server = 'http://localhost:3000'

  function searchMovie(){
    $http.get(`${server}/movies/search?title=${self.title}`)
    .then(function(response){
      console.log(response.data.movie)
    })
  }

  self.searchMovie = searchMovie;
}
