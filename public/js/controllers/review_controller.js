function ReviewController($scope, $http) {
  var self = this;
  server = 'http://localhost:3000'

  $scope.$on('newSearch', function(event, imdbID) {
    getMovieReviews(imdbID)
  });

  $scope.$on('newLogin', function(event, currentUser) {
    getAllReviews()
  })


  // index
  function getAllReviews() {
    $http.get(`${server}/reviews`)
      .then(function(response) {
        self.allReviews = response.data.reviews;
        self.posters = response.data.posters;
      })
      .then(function(){
        self.allReviews.forEach(function(review){
          review.poster = self.posters[review.id]
        })

      });
  }
  getAllReviews();

  function getMovieReviews(imdbID){
    $http.get(`${server}/movies/${imdbID}/reviews`)
    .then(function(response){
      self.movieReviews = response.data.reviews
    })
  }

  // function getUserReviews(currentUser){
  //   $http.get(`${server}/users/${currentUser.id}/reviews`)
  //   .then(function(response){
  //      self.userReviews = response.data.reviews
  //   })
  // }

  self.newReview = {title: '', rating: '', comments: ''};

  function addReview(currentUser, movie){
    $http.post(`${server}/movies`, {movie: movie, imdbID: movie.imdbID})
    .then(function(response){
      self.id = (response.data.movie.id)

      $http.post(`${server}/movies/${self.id}/reviews`, { review: { title: self.newReview.title, rating: self.newReview.rating, comments: self.newReview.comments, user_id: currentUser.id, movie_id: self.id, imdbID: movie.imdbID }})
      .then(function(response){
        getMovieReviews(movie.imdbID);
        self.newReview = {title: '', rating: '', comments: ''};

      })
    })
  }

  function editReview(review, currentUser) {

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
