/**
 * Created by Alfred on 2015-04-25.
 */

(function () {
  'use strict';

  function DashboardService($http, $q, configs, User) {

    var owers = [];

    this.setOwers = setOwers;
    this.searchEmail = searchEmail;
    this.findOwer = findOwer;
    this.getByEmail = getByEmail;
    this.addToCache = addToCache;

    function addToCache(user){
      if(user instanceof User){
        owers.push(user);
      }
    }

    function findOwer(id){
      var i, k;
      for (i = 0, k = owers.length; i < k; i++) {
        if (id === owers[i].id) {
          return owers[i];
        }
      }

      return null;
    }

    function setOwers() {
      var d = $q.defer();
      $http.get(configs.baseUrl + 'user/owers')
        .success(function (responseOwers) {
          if(responseOwers instanceof Array){
            owers = responseOwers.map(function(ower){
              return new User(ower);
            });
          }
          d.resolve();
        });
      return d.promise;
    }

    function getByEmail(email){
      var i, k;
      for (i = 0, k = owers.length; i < k; i++) {
        if (email.toLowerCase() === owers[i].email.toLowerCase()) {
          return owers[i];
        }
      }

      return null;
    }

    function searchEmail(email) {
      return owers
        .filter(function (ower) {
          return ower.email.search(email) > -1;
        })
        .map(function (ower) {
          return {key:ower.id, value: ower.email};
        });
    }
  }

  DashboardService.$inject = ['$http', '$q', 'configs', 'User'];

  angular.module('youomi.dashboard').service('DashboardService', DashboardService);

})();
