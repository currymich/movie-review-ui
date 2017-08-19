function ReviewController($scope, $http) {
  var self = this;
  // server = 'http://localhost:3000'
  var server = 'https://movie-review-api.herokuapp.com'

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
    $http.post(`${server}/movies`, {movie: {
      Title: movie.title,
      Poster: movie.poster_path,
      imdbID: movie.imdb_id,
      Genre: movie.genres[0].name,
      imdbRating: movie.vote_average,
      Plot: movie.overview,
      Year: movie.release_date
    }, imdbID: movie.imdb_id})
    .then(function(response){
      var movie = (response.data.movie)

      $http.post(`${server}/movies/${movie.id}/reviews`, { review: { title: self.newReview.title, rating: self.newReview.rating, comments: self.newReview.comments, user_id: currentUser.id, movie_id: movie.id}})
      .then(function(response){
        console.log('new review response', response);
        getMovieReviews(response.data.movie.imdbID);
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
