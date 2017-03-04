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
  function getMovieReviews() {
    $http.get(`${server}/movies/${id}/reviews`)
      .then(function(reviewResponse) {
        console.log(reviewResponse)
        console.log(reviewResponse.data)
        self.movieReviews = reviewResponse.data;
      });
  }

  function newReview(id){
    $http.post(`${server}/movies/${id}/reviews`, {review: reviewData})
    .then(function(response){
      console.log(response)
    })
  }

  self.newReview = {title: '', rating: '', comments: ''};

  function addReview(){
    // $http.post(`${server}`)
    self.allReviews.push({
      review: { title: self.newReview.title, rating: self.newReview.rating, comments: self.newReview.comments }
    })
    self.newReview = '';
  };

  self.addReview = addReview;
  self.getAllReviews = getAllReviews;
}
