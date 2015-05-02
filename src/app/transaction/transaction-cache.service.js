/**
 * Created by Alfred on 2015-05-02.
 */

(function () {
  'use strict';

  function TransactionCacheService() {

    var cache = null;

    this.init = init;
    this.clear = clear;
    this.getItems = getItems;
    this.hasCache = hasCache;
    this.addOwed = addOwed;
    this.removeOwed = removeOwed;
    this.removeOweByGuid = removeOweByGuid;

    function removeOweByGuid(guid, recordId) {
      var i, k, transaction, record;
      for (i = 0; record = cache.owe[i]; i++) {
        if (record.id !== recordId) continue;
        for (k = 0; transaction = record.transactions[k]; k++){
          if (transaction.identifier !== guid) continue;
          record.transactions.splice(k, 1);
          if (record.transactions.length === 0){
            cache.owe.splice(i, 1);
          }
          break;
        }
      }
    }

    function removeOwed(transactionId, recordId) {
      var i, k, transaction, record;
      for (i = 0; record = cache.owed[i]; i++) {
        if (record.id !== recordId) continue;
        for (k = 0; transaction = record.transactions[k]; k++){
          if (transaction.id !== transactionId) continue;
          record.transactions.splice(k, 1);
          if (record.transactions.length === 0){
            cache.owed.splice(i, 1);
          }
          break;
        }
      }
    }

    function addOwed(transaction) {
      var added = false, i, k;

      if (cache === null) {
        init();
        cache.owed.push(angular.copy(transaction));
        return;
      }


      if (cache && cache.owed) {
        for (i = 0; k = cache.owed[i]; i++) {
          if (k.id !== transaction.id) continue;
          k.transactions.push(angular.copy(transaction.transactions[0]));
          added = true;
          break;
        }

        if (!added) {
          cache.owed.push(angular.copy(transaction));
        }
      }
    }


    function hasCache() {
      return cache !== null;
    }

    function getItems() {
      return cache;
    }

    function clear() {
      cache = null;
    }

    function init(transactionOwed, transactionOwe) {
      cache = {
        owed: angular.isArray(transactionOwed) ? angular.copy(transactionOwed) : [],
        owe: angular.isArray(transactionOwe) ? angular.copy(transactionOwe) : []
      };
    }

  }

  TransactionCacheService.$inject = [];


  angular.module('youomi.transaction').service('TransactionCacheService', TransactionCacheService);

})();
