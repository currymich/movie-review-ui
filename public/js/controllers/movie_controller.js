function MovieController($scope, $http) {
  var self = this;
  // server = 'http://localhost:3000'
  var server = 'https://movie-review-api.herokuapp.com'

  function searchMovie(title){
    self.bigResult = null
    self.result2 = null
    self.result3 = null
    self.result4 = null
    $http.get(`${server}/movies/search?title=${title}`)
    .then(function(response){
      console.log(response.data.results);
      self.bigResult = response.data.detailed
      self.result2 = response.data.results.results[1]
      self.result3 = response.data.results.results[2]
      self.result4 = response.data.results.results[3]

      return response.data.detailed.imdb_id
    })
    .then(function(imdbID){
      $scope.$broadcast('newSearch', imdbID);

    })
  }

  self.searchMovie = searchMovie;
}
