'use strict';


function config($stateProvider, $urlRouterProvider, $httpProvider) {
  $httpProvider.interceptors.push('HttpInterceptor');
  $stateProvider
    .state('home', {
      url: '/',
      abstract:true,
      templateUrl: 'app/main/views/main.html'
    })
    .state('home.homepage', {
      url:'',
      templateUrl: 'app/main/views/homepage.html'
    });

  $urlRouterProvider.otherwise('/');
}

config.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];


angular
  .module('youomi', [
    'youomi.core',
    'youomi.authentication',
    'youomi.user',
    'youomi.dashboard'
  ])
  .config(config);
