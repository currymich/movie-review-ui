angular.module('movieReviewApp', ['ui.router'])
  .config(AppRouter)
  .config(authInterceptor)

  function authInterceptor($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor')
  }

  function AppRouter($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('index', {
      url: '/',
      templateUrl: '/partials/home.html'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: '/partials/signup.html',
      controller: 'AuthController as auth'
    })
  }
