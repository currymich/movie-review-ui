function MovieController($scope, $http) {
  var self = this;
  server = 'http://localhost:3000'
  self.result1 = []
  self.result1.Poster = ''

  function searchMovie(){
    $http.get(`${server}/movies/search?title=${self.title}`)
    .then(function(response){
      self.bigResult = response.data.large
      self.result1 = response.data.small.Search[1]
      self.result2 = response.data.small.Search[2]
      self.result3 = response.data.small.Search[3]
      console.log(response.data.small)
      console.log(response.data.large)
    })
  }

  self.searchMovie = searchMovie;
}
