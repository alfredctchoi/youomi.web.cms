(function () {

  'use strict';

  function AuthenticationService($http, $q, configs, $cookies, SessionService) {

    //private vars
    var authUrl = configs.baseUrl + 'authenticate',
      that = this;

    this.session = null;
    this.authenticate = authenticate;
    this.logout = logout;

    function authenticate(email, password) {
      var d = $q.defer(),
        postData = {email: email, password: password},
        promise = $http.post(authUrl, postData);

      promise.success(function (session) {
        that.session = session;
        $cookies[configs.sessionCookieKey] = angular.toJson(that.session);
        d.resolve(session);
      });

      promise.error(function (err) {
        d.reject(err);
      });

      return d.promise;
    }

    function logout() {
      var logoutUrl = authUrl + '/logout',
        d = $q.defer(),
        promise = $http.delete(logoutUrl);

      promise.success(function () {
        SessionService.destroy();
        d.resolve();
      });
      promise.error(function (err) {
        d.reject();
      });

      return d.promise;
    }

  }

  AuthenticationService.$inject = ['$http', '$q', 'configs', '$cookies', 'SessionService'];

  angular.module('youomi.authentication').service('AuthenticationService', AuthenticationService);
})();
