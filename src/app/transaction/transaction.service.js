/**
 * Created by Alfred on 2015-04-17.
 */

(function () {
  'use strict';

  function TransactionService($http, $q, configs, DashboardService, User, TransactionCacheService) {

    var dashboardUrl = configs.baseUrl + 'transaction';

    this.getOutstandingItems = getOutstandingItems;
    this.create = create;
    this.remove = remove;
    this.update = update;
    this.remindUser = remindUser;
    this.complete = complete;
    this.confirm = confirm;
    this.returnItem = returnItem;
    this.reactivate = reactivate;

    function remove(id, recordId) {
      var d = $q.defer(),
        deleteUrl = dashboardUrl + '/' + id,
        prom = $http.delete(deleteUrl, null);

      prom.success(function () {
        TransactionCacheService.removeOwed(id, recordId);
        d.resolve();
      });

      prom.error(function (err) {
        d.reject(err);
      });

      return d.promise;
    }

    function update(id, type, value) {
      var d = $q.defer(),
        updateUrl = dashboardUrl + '/' + id,
        putData = {
          type: type,
          value: value
        },
        prom = $http.put(updateUrl, putData);

      prom.success(function (data) {
        d.resolve(data);
      });

      prom.error(function (err) {
        d.reject(err);
      });

      return d.promise;
    }

    function reactivate(transactionId) {
      var d = $q.defer(),
        reactivateUrl = dashboardUrl + '/' + transactionId + '/reactivate',
        prom = $http.put(reactivateUrl, null);

      prom.success(function (data) {
        d.resolve(data);
      });

      prom.error(function (err) {
        d.reject(err);
      });

      return d.promise;
    }

    function returnItem(guid, recordId) {
      var d = $q.defer(),
        completeUrl = dashboardUrl + '/' + guid + '/complete',
        prom = $http.put(completeUrl, null);

      prom.success(function (data) {
        TransactionCacheService.removeOweByGuid(guid, recordId);
        d.resolve(data);
      });

      prom.error(function (err) {
        d.reject(err);
      });

      return d.promise;
    }

    function confirm(transactionId, recordId) {
      var d = $q.defer(),
        confirmUrl = dashboardUrl + '/' + transactionId + '/confirm',
        prom = $http.put(confirmUrl, null);

      prom.success(function () {
        TransactionCacheService.removeOwed(transactionId, recordId);
        d.resolve();
      });

      prom.error(function (err) {
        d.reject(err);
      });

      return d.promise;
    }

    function getOutstandingItems() {
      var listUrl = dashboardUrl + '/list',
        d = $q.defer(),
        prom;

      if (TransactionCacheService.hasCache()) {
        d.resolve(TransactionCacheService.getItems());
      } else {
        prom = $http.get(listUrl);
        prom.success(function (items) {
          TransactionCacheService.init(items.owed, items.owe);
          d.resolve(TransactionCacheService.getItems());
        });

        prom.error(function (error) {
          d.reject(error)
        });
      }

      return d.promise;
    }

    function create(type, value, owerEmail, owerName) {
      var d = $q.defer(),
        ower,
        postData = {type: type, value: value, owerEmail: owerEmail, owerName: owerName},
        prom = $http.post(dashboardUrl, postData);

      prom.success(function (newTransaction) {
        TransactionCacheService.addOwed(newTransaction);

        ower = DashboardService.getByEmail(owerEmail);
        if (!ower) {
          ower = new User({
            id: newTransaction.owerId,
            email: owerEmail,
            name: owerName
          });

          DashboardService.addToCache(ower);
        }
        d.resolve();
      });

      prom.error(function (error) {
        d.reject(error);
      });

      return d.promise;
    }

    function complete(id) {
      var d = $q.defer(),
        completeUrl = dashboardUrl + '/' + id + '/complete',
        prom = $http.put(completeUrl, null);

      prom.success(function (data) {
        d.resolve(data)
      });

      prom.error(function (err) {
        d.reject(err);
      });

      return d.promise;
    }

    function remindUser(userId) {
      var d = $q.defer(),
        remindUrl = dashboardUrl + '/remind-user/' + userId,
        prom = $http.post(remindUrl, null);

      prom.success(function (data) {
        d.resolve(data);
      });

      prom.error(function (error) {
        d.reject(error)
      });

      return d.promise;
    }

  }

  TransactionService.$inject = ['$http', '$q', 'configs', 'DashboardService', 'User', 'TransactionCacheService'];

  angular.module('youomi.transaction').service('TransactionService', TransactionService);

})();
