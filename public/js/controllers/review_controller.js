function ReviewController($scope, $http) {
  var self = this;
  server = 'http://localhost:3000'
  self.allReviews = [];
  // self.movieReviews = [];

  function getAllReviews() {
    $http.get(`${server}/reviews`)
      .then(function(reviewResponse) {
        console.log(reviewResponse)
        console.log(reviewResponse.data)
        self.allReviews = reviewResponse.data;
      });
  }
  getAllReviews();

  // function getMovieReviews() {
  //   $http.get(`${server}/movies/${id}/reviews`)
  //     .then(function(reviewResponse) {
  //       console.log(reviewResponse)
  //       console.log(reviewResponse.data)
  //       self.movieReviews = reviewResponse.data;
  //     });
  // }

  // self.movieReviews = movieReviews;
  self.getAllReviews = getAllReviews;
}
