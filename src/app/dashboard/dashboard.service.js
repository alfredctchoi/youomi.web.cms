/**
 * Created by Alfred on 2015-04-25.
 */

(function () {
  'use strict';

  function DashboardService($http, $q, configs) {

    var owers = [];

    this.setOwers = setOwers;
    this.searchEmail = searchEmail;
    this.findOwer = findOwer;

    function findOwer(id){
      var i, k;
      for (i = 0, k = owers.length; i < k; i++) {
        if (id === owers[i].id) {
          return owers[i];
        }
      }
    }

    function setOwers() {
      var d = $q.defer();
      $http.get(configs.baseUrl + 'user/owers')
        .success(function (responseOwers) {
          owers = responseOwers;
          d.resolve();
        });
      return d.promise;
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

  DashboardService.$inject = ['$http', '$q', 'configs'];

  angular.module('youomi.dashboard').service('DashboardService', DashboardService);

})();
