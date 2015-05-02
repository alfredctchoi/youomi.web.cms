(function () {

  'use strict';

  function AuthenticationService($http, $q, configs, SessionService, TransactionCacheService) {

    var authUrl = configs.baseUrl + 'authenticate';

    this.authenticate = authenticate;
    this.logout = logout;
    this.forgotPassword = forgotPassword;
    this.resetPassword = resetPassword;
    this.validateResetToken = validateResetToken;

    function resetPassword(guid, password){
      var d = $q.defer(),
        forgotPasswordUrl = authUrl + '/reset-password/' + guid,
        putData = {password: password},
        promise = $http.put(forgotPasswordUrl, putData);

      promise.success(d.resolve);
      promise.error(d.reject);

      return d.promise;
    }

    function validateResetToken(guid){
      var d = $q.defer(),
        validateUrl = authUrl + '/reset-password-validate/' + guid,
        promise = $http.get(validateUrl);

      promise.success(d.resolve);
      promise.error(d.reject);

      return d.promise;
    }

    function forgotPassword(email){
      var d = $q.defer(),
        forgotPasswordUrl = authUrl + '/reset-password',
        postData = {email: email},
        promise = $http.post(forgotPasswordUrl, postData);

      promise.success(d.resolve);
      promise.error(d.reject);

      return d.promise;
    }

    function authenticate(email, password) {
      var d = $q.defer(),
        postData = {email: email, password: password},
        promise = $http.post(authUrl, postData);

      SessionService.destroy();

      promise.success(function (session) {
        SessionService.create(session);
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
        TransactionCacheService.clear();
        d.resolve();
      });
      promise.error(function (err) {
        d.reject();
      });

      return d.promise;
    }

  }

  AuthenticationService.$inject = ['$http', '$q', 'configs', 'SessionService', 'TransactionCacheService'];

  angular.module('youomi.authentication').service('AuthenticationService', AuthenticationService);
})();
