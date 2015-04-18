/**
 * Created by Alfred on 2015-04-17.
 */

(function () {
    'use strict';

  function UserService($http, $q, configs){

    var userUrl = configs.baseUrl + 'user';

    this.register = register;
    this.activate = activate;

    function activate(guid) {
      var d = $q.defer(),
        activateUrl = userUrl + '/activate/' + guid,
        prom = $http.put(activateUrl, null);

      prom.success(function() {
        d.resolve();
      });

      prom.error(function(err){
        d.reject(err);
      });

      return d.promise;
    }

    function register(name, email, password){

      var d = $q.defer(),
        postData = {name: name, email: email, password: password},
        promise = $http.post(userUrl, postData);

      promise.success(function(data){
        d.resolve(data);
      });

      promise.error(function(error){
        d.reject(error);
      });

      return d.promise;

    }

  }

  UserService.$inject = ['$http', '$q', 'configs'];

  angular.module('youomi.user').service('UserService', UserService);


})();
