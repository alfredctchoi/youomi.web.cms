/**
 * Created by Alfred on 2015-04-17.
 */

(function () {
    'use strict';

  function SessionService(configs) {

    var session = null;

    this.getSession = getSession;
    this.hasSession = hasSession;
    this.destroy = destroy;
    this.create = create;

    function create(newSession){
      session = newSession;
      localStorage.setItem(configs.sessionCookieKey, angular.toJson(session));
    }

    function destroy(){
      session = null;
      localStorage.removeItem(configs.sessionCookieKey);
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
      return localStorage.getItem(configs.sessionCookieKey);
    }
  }

  SessionService.$inject = ['configs'];

  angular.module('youomi.authentication').service('SessionService', SessionService);

})();
