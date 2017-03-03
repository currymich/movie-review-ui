function HomeController($scope, $http) {
  var self = this;

  $scope.$on('userLoggedIn', function(event, data) {
    self.currentUser = data;
  });

  $scope.$on('userUpdated', function(event, data) {
    self.currentUser = data;
  });

  $scope.$on('userLoggedOut', function(event, data) {
    self.currentUser = null;
  });

}
