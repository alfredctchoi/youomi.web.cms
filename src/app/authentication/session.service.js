/**
 * Created by Alfred on 2015-04-17.
 */

(function () {
    'use strict';

  function SessionService(configs, $cookies) {

    var session = null;

    this.getSession = getSession;
    this.hasSession = hasSession;
    this.destroy = destroy;

    function destroy(){
      session = null;
      delete $cookies[configs.sessionCookieKey];
    }

    function getSession(){
      var cookie = getCookie();

      if (!session && cookie) {
        session = angular.fromJson(cookie);
      }

      return session;
    }

    function hasSession () {
      return getCookie() !== undefined;
    }

    function getCookie(){
      return $cookies[configs.sessionCookieKey];
    }
  }

  SessionService.$inject = ['configs','$cookies'];

  angular.module('youomi.authentication').service('SessionService', SessionService);

})();
