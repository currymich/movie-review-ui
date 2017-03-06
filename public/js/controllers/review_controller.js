function ReviewController($scope, $http) {
  var self = this;
  // server = 'http://localhost:3000'
  var server = 'https://movie-review-api.herokuapp.com'
  self.allReviews = [];

  // index
  function getAllReviews() {
    $http.get(`${server}/reviews`)
      .then(function(reviewResponse) {
        self.allReviews = reviewResponse.data;
      });
  }
  getAllReviews();

  self.newReview = {title: '', rating: '', comments: ''};

  function addReview(currentUser, movie){
    $http.post(`${server}/movies`, {movie: movie, imdbID: movie.imdbID})
    .then(function(response){
      self.id = (response.data.movie.id)

      $http.post(`${server}/movies/${self.id}/reviews`, { review: { title: self.newReview.title, rating: self.newReview.rating, comments: self.newReview.comments, user_id: currentUser.id, movie_id: self.id }})
      .then(function(response){
        // getMovieReviews(imdbID);
        // self.newReview = {title: '', rating: '', comments: ''};
      })
    })
  }

  function editReview(review) {
    $http.put(`${server}/reviews/` + review.id, { review: { title: self.updatedReview.title, rating: self.updatedReview.rating, comments: self.updatedReview.comments }})
      .then(function(response) {
        self.updatedReview = '';
        getAllReviews();
      });
  }

  function deleteReview(review, currentUser) {
    $http.delete(`${server}/reviews/` + review.id)
      .then(function(response) {
        getAllReviews();
      });
  }

  self.deleteReview = deleteReview;
  self.editReview = editReview;
  self.addReview = addReview;
  self.getAllReviews = getAllReviews;
}
