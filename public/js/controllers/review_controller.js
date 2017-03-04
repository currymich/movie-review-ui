function ReviewController($scope, $http) {
  var self = this;
  server = 'http://localhost:3000'
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
  function getMovieReviews(imdbID) {
    $http.get(`${server}/movies/${imdbID}/reviews`)
      .then(function(reviewResponse) {
        console.log(reviewResponse)
        console.log(reviewResponse.data)
        self.movieReviews = reviewResponse.data;
      });
  }

  self.newReview = {title: '', rating: '', comments: ''};

  function addReview(currentUser, imdbID){
    $http.post(`${server}/movies/${imdbID}/reviews`, { review: { title: self.newReview.title, rating: self.newReview.rating, comments: self.newReview.comments, user_id: currentUser.id }})
    .then(function(response){
      console.log(response);
      getMovieReviews(imdbID);
      self.newReview = '';
    })
  }

  function editReview(review) {
    console.log("Hit Edit Review Route");
    console.log(review.id)
    $http.put(`${server}/reviews/` + review.id, { review: { title: self.title, rating: self.rating, comments: self.comments }})
      .then(function(response) {
        console.log(response)
        // getMovieReviews(imdbID);
      })
  }

  self.editReview = editReview;
  self.addReview = addReview;
  self.getAllReviews = getAllReviews;
}
