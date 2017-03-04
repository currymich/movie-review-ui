function AuthController($http, $state, $scope, $rootScope, AuthTokenFactory) {
  var self    = this;
  // var server  = 'http://localhost:3000';
  var server = 'https://movie-review-api.herokuapp.com'

  function signup(userPass) {
    $http.post(`${server}/users`, { user: userPass })
      .then(function(response) {
        console.log(response.data)
        AuthTokenFactory.setToken(response.data.token)

        $scope.$emit('userLoggedIn', response.data.user);
        $state.go('index');
      });
  }

  function login(userPass) {
    $http.post(`${server}/users/login`, { user: userPass })
      .then(function(response) {
        console.log(response.data)
        AuthTokenFactory.setToken(response.data.token)

        $scope.$emit('userLoggedIn', response.data.user);
        // $state.go('index');
      });
  }

  function updateUser(userPass) {
    console.log("Hit Update Route")
    $http.put(`${server}/users/edit`, { user: userPass })
      .then(function(response) {
        console.log(response.data)
        AuthTokenFactory.setToken(response.data.token)

        $scope.$emit('userUpdated', response.data.user);
      });
  }

  function logout() {
    AuthTokenFactory.setToken()

    $scope.$emit('userLoggedOut');
    // $state.go('index');
  }

  this.updateUser = updateUser;
  this.signup = signup;
  this.login = login;
  this.logout = logout;
}
