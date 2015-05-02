/**
 * Created by Alfred on 2015-05-02.
 */

(function () {
  'use strict';

  function TransactionCacheService(TransactionStatuses) {

    var cache = null;

    this.init = init;
    this.clear = clear;
    this.getItems = getItems;
    this.hasCache = hasCache;
    this.addOwed = addOwed;
    this.removeOwed = removeOwed;
    this.removeOweByGuid = removeOweByGuid;
    this.removeFromActionItems = removeFromActionItems;
    this.reactivate = reactivate;

    function removeFromActionItems(transactionId) {
      var i, item;

      for (i = 0; item = cache.actionItems[i]; i++) {
        if (item.transaction.id === transactionId){
          cache.actionItems.splice(i, 1);
          break;
        }
      }
    }

    function reactivate(transactionId){
      var i, k, item, record;
      for (i =0; item = cache.actionItems[i]; i++){
        if (item.transaction.id === transactionId){
          // set status to active
          item.transaction.status = TransactionStatuses.active;

          // loop through records in owed list to find if
          // user already exists.  If it exists then add to the
          // existing list's transactions list
          for(k = 0; record = cache.owed[k]; k++){
            if (record.id === item.id){
              record.transactions.push(angular.copy(item.transaction));
              cache.actionItems.splice(i, 1);
              return;
            }
          }

          // if it does not exist, make a new item
          cache.owed.push({
            canRemind: item.canRemind,
            email: item.email,
            id: item.id,
            lastReminded: item.lastReminded,
            name: item.name,
            owerId: item.owerId,
            transactions: [angular.copy(item.transaction)],
            update: false
          });
          cache.actionItems.splice(i, 1);
          return;
        }
      }
    }

    function removeOweByGuid(guid, recordId) {
      var i, k, transaction, record;
      for (i = 0; record = cache.owe[i]; i++) {
        if (record.id !== recordId) continue;
        for (k = 0; transaction = record.transactions[k]; k++) {
          if (transaction.identifier === guid){
            record.transactions.splice(k, 1);
            if (record.transactions.length === 0) {
              cache.owe.splice(i, 1);
            }
            return;
          }
        }
      }
    }

    function removeOwed(transactionId, recordId) {
      var i, k, transaction, record;
      for (i = 0; record = cache.owed[i]; i++) {
        if (record.id !== recordId) continue;
        for (k = 0; transaction = record.transactions[k]; k++) {
          if (transaction.id !== transactionId) continue;
          record.transactions.splice(k, 1);
          if (record.transactions.length === 0) {
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

    function init(transactionOwed, transactionOwe, actionItems) {
      cache = {
        owed: angular.isArray(transactionOwed) ? angular.copy(transactionOwed) : [],
        owe: angular.isArray(transactionOwe) ? angular.copy(transactionOwe) : [],
        actionItems: angular.isArray(actionItems) ? angular.copy(actionItems) : []
      };
    }
  }

  TransactionCacheService.$inject = ['TransactionStatuses'];


  angular.module('youomi.transaction').service('TransactionCacheService', TransactionCacheService);

})();
