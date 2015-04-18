/**
 * Created by Alfred on 2015-04-17.
 */

(function () {
    'use strict';

  function TransactionService($http, $q, configs) {

    var dashboardUrl = configs.baseUrl + 'transaction';

    this.getOutstandingItems = getOutstandingItems;
    this.create = create;
    this.remindUser = remindUser;

    function getOutstandingItems (){
      var listUrl  = dashboardUrl + '/list',
        d = $q.defer(),
        prom = $http.get(listUrl);

      prom.success(function(items) {
        d.resolve(items);
      });

      prom.error(function(error){
        d.reject(error)
      });

      return d.promise;
    }

    function create(type, value, owerEmail, owerName){
      var d = $q.defer(),
        postData = {type: type, value: value, owerEmail: owerEmail, owerName: owerName},
        prom = $http.post(dashboardUrl, postData);

      prom.success(function(newTransaction){
        d.resolve(newTransaction);
      });

      prom.error(function(error){
        d.reject(error);
      });

      return d.promise;
    }

    function remindUser(userId){
      var d = $q.defer(),
        remindUrl = dashboardUrl + '/remind-user/' + userId,
        prom = $http.post(remindUrl, null);

      prom.success(function(data){
        d.resolve(data);
      });

      prom.error(function(error){
        d.reject(error)
      });

      return d.promise;
    }

  }

  TransactionService.$inject = ['$http', '$q', 'configs'];

  angular.module('youomi.dashboard').service('TransactionService', TransactionService);

})();
