function ReviewController($scope, $http) {
  var self = this;
  server = 'http://localhost:3000'
  self.allReviews = [];


  function getAllReviews() {
    $http.get(`${server}/reviews`)
      .then(function(reviewResponse) {
        console.log(reviewResponse)
        console.log(reviewResponse.data)
        self.allReviews = reviewResponse.data;
      });
  }
  getAllReviews();

  function getMovieReviews() {

  }


  self.getAllReviews = getAllReviews;
}
