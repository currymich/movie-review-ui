angular.module('movieReviewApp', ['ui.router'])
  .config(AppRouter)
  .config(authInterceptor)

  function authInterceptor($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor')
  }

  function AppRouter($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('index', {
      url: '/',
      templateUrl: '/partials/home.html',
      controller: 'ReviewController as rev'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: '/partials/signup.html',
      controller: 'AuthController as auth'
    })
    .state('user-show', {
      url: '/user-show',
      templateUrl: '/partials/user-show.html',
      controller: 'AuthController as auth'
    })
    .state('movie', {
      url: '/movie',
      templateUrl: '/partials/movie.html',
      controller: 'MovieController as movie'
    })

  }
