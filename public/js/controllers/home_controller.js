function HomeController($scope, $http) {
  var self = this;

  $scope.$on('userLoggedIn', function(event, data) {
    self.currentUser = data;
    $scope.$broadcast('newLogin', self.currentUser)
  });

  $scope.$on('userUpdated', function(event, data) {
    self.currentUser = data;
  });

  $scope.$on('userLoggedOut', function(event, data) {
    self.currentUser = null;
  });

  $scope.$on('userPageLoaded', function(event){
    console.log('load finished')
    $scope.$broadcast('newLogin', self.currentUser)
  })

}
