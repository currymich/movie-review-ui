function ReviewController($scope, $http) {
  var self = this;
  // server = 'http://localhost:3000'
  var server = 'https://movie-review-api.herokuapp.com'
  self.allReviews = [];
  // self.movieReviews = [];

  // index
  function getAllReviews() {
    $http.get(`${server}/reviews`)
      .then(function(reviewResponse) {
        console.log(reviewResponse)
        console.log(reviewResponse.data)
        self.allReviews = reviewResponse.data;
      });
  }
  getAllReviews();

  // review show
  // function getMovieReviews(imdbID) {
  //   $http.get(`${server}/movies/${imdbID}/reviews`)
  //     .then(function(reviewResponse) {
  //       console.log(reviewResponse)
  //       console.log(reviewResponse.data)
  //       self.movieReviews = reviewResponse.data;
  //     });
  // }

  self.newReview = {title: '', rating: '', comments: ''};

  function addReview(currentUser, movie){
    $http.post(`${server}/movies`, {movie: movie, imdbID: movie.imdbID})
    .then(function(response){
      console.log(response.data)
      self.id = (response.data.movie.id)

      $http.post(`${server}/movies/${self.id}/reviews`, { review: { title: self.newReview.title, rating: self.newReview.rating, comments: self.newReview.comments, user_id: currentUser.id, movie_id: self.id }})
      .then(function(response){
        console.log(response);
        // getMovieReviews(imdbID);
        // self.newReview = {title: '', rating: '', comments: ''};
      })
    })
  }

  function editReview(review) {
    console.log("Hit Edit Review Route");
    console.log(review.id)
    $http.put(`${server}/reviews/` + review.id, { review: { title: self.updatedReview.title, rating: self.updatedReview.rating, comments: self.updatedReview.comments }})
      .then(function(response) {
        console.log(review)
        console.log(response)
        self.updatedReview = '';
        getAllReviews();
      });
  }

  function deleteReview(review, currentUser) {
    console.log("Hit Delete Review Route");
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
