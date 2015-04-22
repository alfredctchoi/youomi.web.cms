(function () {

  'use strict';

  var regexIso8601 = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d+([+-][0-2]\d:[0-5]\d|Z)/;

  function convertDateStringsToDates(input) {
    // Ignore things that aren't objects.
    if (typeof input !== "object") return input;

    for (var key in input) {
      if (!input.hasOwnProperty(key)) continue;

      var value = input[key];
      var match;
      // Check for string properties which look like dates.
      if (typeof value === "string" && (match = value.match(regexIso8601))) {
        var milliseconds = Date.parse(match[0]);
        if (!isNaN(milliseconds)) {
          input[key] = new Date(milliseconds);
        }
      } else if (typeof value === "object") {
        // Recurse into object
        convertDateStringsToDates(value);
      }
    }
  }

  function config($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.interceptors.push('HttpInterceptor');
    $httpProvider.defaults.transformResponse.push(function (responseData) {
      convertDateStringsToDates(responseData);
      return responseData;
    });
    $stateProvider
      .state('home', {
        url: '/',
        abstract: true,
        templateUrl: 'app/main/views/main.html'
      })
      .state('home.homepage', {
        url: '',
        templateUrl: 'app/main/views/homepage.html'
      })
      .state('home.unauthorized', {
        url: 'unauthorized',
        templateUrl: 'app/main/views/unauthorized.html'
      });

    $urlRouterProvider.otherwise('/');
  }

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

  function runFn($rootScope, SessionService, $state) {
    $rootScope.$on('$stateChangeStart', function (event, to) {
      if (to.name.substr(0, to.name.indexOf('.')) === 'dashboard' && !SessionService.hasSession()) {
        event.preventDefault();
        $state.go('home.unauthorized');
      }
    });
  }

  runFn.$inject = ['$rootScope', 'SessionService', '$state'];

  angular
    .module('youomi', [
      'youomi.core',
      'youomi.authentication',
      'youomi.user',
      'youomi.dashboard',
      'youomi.transaction'
    ])
    .config(config)
    .run(runFn);

})();
