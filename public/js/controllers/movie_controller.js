function MovieController($scope, $http) {
  var self = this;
  // server = 'http://localhost:3000'
  var server = 'https://movie-review-api.herokuapp.com'

  function searchMovie(title){
    self.bigResult = undefined
    self.result2 = undefined
    self.result3 = undefined
    self.result4 = undefined
    $http.get(`${server}/movies/search?title=${title}`)
    .then(function(response){
      self.bigResult = response.data.large
      self.result2 = response.data.small.Search[1]
      self.result3 = response.data.small.Search[2]
      self.result4 = response.data.small.Search[3]
      console.log(response.data.small)
      console.log(response.data.large)
    })
  }

  self.searchMovie = searchMovie;
}
