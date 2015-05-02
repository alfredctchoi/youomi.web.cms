/**
 * Created by Alfred on 2015-04-17.
 */

(function () {
  'use strict';

  function TransactionService($http, $q, configs, DashboardService, User) {

    var dashboardUrl = configs.baseUrl + 'transaction',
      addSubscriptionNotification = [],
      listCache = null;

    this.getOutstandingItems = getOutstandingItems;
    this.create = create;
    this.remove = remove;
    this.remindUser = remindUser;
    this.subscribeToCreate = subscribeToCreate;
    this.complete = complete;
    this.confirm = confirm;
    this.returnItem = returnItem;
    this.reactivate = reactivate;
    this.update = update;

    function remove(id) {
      var d = $q.defer(),
        deleteUrl = dashboardUrl + '/' + id,
        prom = $http.delete(deleteUrl, null);

      prom.success(function () {
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

    function returnItem(guid) {
      var d = $q.defer(),
        completeUrl = dashboardUrl + '/' + guid + '/complete',
        prom = $http.put(completeUrl, null);

      prom.success(function (data) {
        d.resolve(data);
      });

      prom.error(function (err) {
        d.reject(err);
      });

      return d.promise;
    }

    function confirm(transactionId) {
      var d = $q.defer(),
        confirmUrl = dashboardUrl + '/' + transactionId + '/confirm',
        prom = $http.put(confirmUrl, null);

      prom.success(function (data) {
        d.resolve(data);
      });

      prom.error(function (err) {
        d.reject(err);
      });

      return d.promise;
    }

    function subscribeToCreate(callback) {
      addSubscriptionNotification.push(callback);
    }

    function getOutstandingItems() {
      var listUrl = dashboardUrl + '/list',
        d = $q.defer(),
        prom;

      if (listCache) {
        d.resolve(listCache);
      } else {
        prom = $http.get(listUrl);
        prom.success(function (items) {
          listCache = angular.copy(items);
          d.resolve(listCache);
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
        i,
        k,
        postData = {type: type, value: value, owerEmail: owerEmail, owerName: owerName},
        prom = $http.post(dashboardUrl, postData);

      prom.success(function (newTransaction) {

        //addSubscriptionNotification.forEach(function (callback) {
        //  callback(newTransaction);
        //});

        var added = false;
        listCache = listCache || {};
        listCache.owed = listCache.owed || [];

        if (listCache && listCache.owed) {
          for (i = 0; k = listCache.owed[i]; i++) {
            if (k.id !== newTransaction.id) continue;
            k.transactions.push(angular.copy(newTransaction.transactions[0]));
            added = true;
            break;
          }

          if (!added){
            listCache.owed.push(angular.copy(newTransaction));
          }
        }

        ower = DashboardService.getByEmail(owerEmail);
        if (!ower) {
          ower = new User({
            id: newTransaction.owerId,
            email: owerEmail,
            name: owerName
          });

          DashboardService.addToCache(ower);
        }
        d.resolve(newTransaction);
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

  TransactionService.$inject = ['$http', '$q', 'configs', 'DashboardService', 'User'];

  angular.module('youomi.dashboard').service('TransactionService', TransactionService);

})();
