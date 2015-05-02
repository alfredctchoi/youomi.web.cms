/**
 * Created by Alfred on 2015-04-17.
 */

(function () {
  'use strict';

  function OutstandingItemsCtrl(TransactionService, TransactionStatuses) {

    var vm = this,
      transactionCache;
    vm.remind = remind;
    vm.confirm = confirm;
    vm.returnItem = returnItem;
    vm.reactivate = reactivate;
    vm.remove = remove;
    vm.updateTransaction = updateTransaction;
    vm.editTransaction = editTransaction;
    vm.transactionStatus = TransactionStatuses;

    init();

    function init() {
      vm.owed = [];
      vm.owe = [];

      TransactionService
        .getOutstandingItems()
        .then(function (data) {
          vm.owed = data.owed;
          vm.owe = data.owe;
        });
    }

    function removeOwedRecord(recordId){
      var i, k;
      for (i = 0, k = vm.owed.length; i < k; i++){
        if (vm.owed[i].id === recordId){
          vm.owed.splice(i, 1);
          break;
        }
      }
    }

    function remove(transactionId, index, record) {
      TransactionService.remove(transactionId, record.id)
        .then(function () {
          record.transactions.splice(index, 1);
          if (record.transactions.length === 0){
            removeOwedRecord(record.id);
          }
        }, function (error) {
          console.log(error);
        });
    }

    function editTransaction(transaction) {
      transactionCache = angular.copy(transaction);
      transaction.showEdit = !transaction.showEdit;
    }

    function updateTransaction(transaction) {
      if (transactionCache.type === transaction.type && transactionCache.value === transaction.value) {
        transaction.showEdit = false;
        return;
      }

      TransactionService.update(transaction.id, transaction.type, transaction.value)
        .then(function () {

        }, function (error) {
          console.log(error);
        })
        .finally(function () {
          transaction.showEdit = false;
        });
    }

    function reactivate(transaction, transactionId) {
      TransactionService
        .reactivate(transactionId)
        .then(function () {
          transaction.status = vm.transactionStatus.active;
        }, function (error) {
          console.log(error);
        })
    }

    function returnItem(recordId, transactionGuid) {
      TransactionService
        .returnItem(transactionGuid)
        .then(function () {
          var i, k, record, trans, recordBreak;

          for (i = 0; record = vm.owe[i]; i++) {
            if (recordId !== record.id) continue;
            for (k = 0; trans = record.transactions[k]; k++) {
              if (trans.identifier !== transactionGuid) continue;
              record.transactions.splice(k, 1);
              recordBreak = true;
              break;
            }

            if (recordBreak) {
              if (record.transactions.length === 0) {
                vm.owe.splice(i, 1);
              }

              break;
            }
          }
        }, function (err) {
          console.log(err);
        })
    }

    function remind(record, userId) {
      TransactionService
        .remindUser(userId)
        .then(function (updatedRecord) {
          record.lastReminded = updatedRecord.lastReminded;
          record.canRemind = updatedRecord.canRemind;
        }, function (error) {

        });
    }

    function confirm(recordId, transactionId) {
      TransactionService
        .confirm(transactionId)
        .then(function () {
          var i, k, record, trans, recordBreak;

          for (i = 0; record = vm.owed[i]; i++) {
            if (recordId !== record.id) continue;
            for (k = 0; trans = record.transactions[k]; k++) {
              if (trans.id !== transactionId) continue;
              record.transactions.splice(k, 1);
              recordBreak = true;
              break;
            }

            if (recordBreak) {
              if (record.transactions.length === 0) {
                vm.owed.splice(i, 1);
              }

              break;
            }
          }
        }, function (err) {
          console.log(err);
        });
    }

  }

  OutstandingItemsCtrl.$inject = ['TransactionService', 'TransactionStatuses'];

  angular.module('youomi.dashboard').controller('OutstandingItemsCtrl', OutstandingItemsCtrl);

})();
