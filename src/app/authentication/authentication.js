(function () {
  'use strict';

  function configs($stateProvider){
    $stateProvider
      .state('home.sign-up', {
        'url': 'sign-up',
        templateUrl: 'app/authentication/views/register-main.html'
      })
      .state('home.login', {
        'url': 'login',
        templateUrl: 'app/authentication/views/login-main.html'
      })
      .state('home.account', {
        url: 'account',
        abstract: true,
        template:'<ui-view></ui-view>'
      })
      .state('home.account.register-complete', {
        url: '/register-complete',
        templateUrl: 'app/authentication/views/register-complete.html'
      })
      .state('home.account.activate', {
        url: '/activate/:id',
        templateUrl: 'app/authentication/views/activate.html'
      })
      .state('home.account.forgot-password', {
        url: '/forgot-password',
        templateUrl: 'app/authentication/views/forgot-password.html'
      })
      .state('home.account.reset-password', {
        url: '/reset-password/:id',
        templateUrl: 'app/authentication/views/reset-password.html'
      });
  }

  angular
    .module('youomi.authentication', [
      'ui.router',
      'ngCookies',
      'youomi.user'
    ])
    .config(configs);
})();
