/**
 * Created by Alfred on 2015-04-17.
 */

(function () {
    'use strict';

  function TransactionService($http, $q, configs) {

    var dashboardUrl = configs.baseUrl + 'transaction',
      addSubscriptionNotification = [];

    this.getOutstandingItems = getOutstandingItems;
    this.create = create;
    this.remindUser = remindUser;
    this.subscribeToCreate = subscribeToCreate;
    this.complete = complete;
    this.confirm = confirm;
    this.returnItem = returnItem;
    this.reactivate = reactivate;

    function reactivate(transactionId){
      var d = $q.defer(),
        reactivateUrl = dashboardUrl + '/' + transactionId + '/reactivate',
        prom = $http.put(reactivateUrl, null);

      prom.success(function(data){
        d.resolve(data);
      });

      prom.error(function(err){
        d.reject(err);
      });

      return d.promise;
    }

    function returnItem(guid){
      var d = $q.defer(),
        completeUrl = dashboardUrl + '/' + guid + '/complete',
        prom = $http.put(completeUrl, null);

      prom.success(function(data){
        d.resolve(data);
      });

      prom.error(function(err){
        d.reject(err);
      });

      return d.promise;
    }

    function confirm (transactionId){
      var d = $q.defer(),
        confirmUrl = dashboardUrl + '/' + transactionId + '/confirm',
        prom = $http.put(confirmUrl, null);

      prom.success(function(data){
        d.resolve(data);
      });

      prom.error(function(err){
        d.reject(err);
      });

      return d.promise;
    }

    function subscribeToCreate(callback){
      addSubscriptionNotification.push(callback);
    }

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
        addSubscriptionNotification.forEach(function(callback){
          callback(newTransaction);
        });

        d.resolve(newTransaction);
      });

      prom.error(function(error){
        d.reject(error);
      });

      return d.promise;
    }

    function complete(id){
      var d = $q.defer(),
        completeUrl = dashboardUrl + '/' + id + '/complete',
        prom = $http.put(completeUrl, null);

      prom.success(function(data){
        d.resolve(data)
      });

      prom.error(function(err){
        d.reject(err);
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
