/**
 * Created by Alfred on 2015-04-25.
 */

(function () {
    'use strict';

  function UserFactory(){

    function User(){

      this.email = null;
      this.id = null;
      this.name = null;

      for (var p in arguments[0]){
        if (!arguments[0].hasOwnProperty(p) || !this.hasOwnProperty(p)) continue;
        this[p] = arguments[0][p];
      }
    }

    return User;
  }

  angular.module('youomi.user').factory('User', UserFactory);

})();
