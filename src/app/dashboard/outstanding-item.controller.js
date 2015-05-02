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
          vm.transactions = data;
        });
    }

    function remove(transactionId, record) {
      TransactionService.remove(transactionId, record.id)
        .then(function () {
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
        .then(function () {}, function (error) {console.log(error);})
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
        .returnItem(transactionGuid, recordId)
        .then(function () {}, function (err) {console.log(err);})
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
        .confirm(transactionId, recordId)
        .then(function () {}, function (err) {console.log(err);
        });
    }

  }

  OutstandingItemsCtrl.$inject = ['TransactionService', 'TransactionStatuses'];

  angular.module('youomi.dashboard').controller('OutstandingItemsCtrl', OutstandingItemsCtrl);

})();
