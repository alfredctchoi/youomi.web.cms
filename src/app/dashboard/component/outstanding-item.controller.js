/**
 * Created by Alfred on 2015-04-17.
 */

(function () {
  'use strict';

  function OutstandingItemsCtrl(TransactionService) {

    var vm = this;
    vm.remind = remind;

    init();

    function init() {
      TransactionService
        .getOutstandingItems()
        .then(function (items) {
          vm.records = items;
        });

      TransactionService.subscribeToCreate(update);
    }

    /**
     * Callback that is called when a new record
     * has been added
     * @param item
     */
    function update(item) {
      var i, record;
      for (i = 0; record = vm.records[i]; i++) {
        /** @namespace item.owerId */
        if (record.owerId === item.owerId) {
          item.transactions.forEach(function(trans){
            record.transactions.push(trans);
          });
          return;
        }
      }

      // if not in records list, add it with the user
      record = item;
      vm.records.push(record);
    }

    function remind(userId) {
      TransactionService.remindUser(userId).then(function (data) {
        console.log(data);
      }, function (error) {
        console.log(error);
      });
    }

  }

  OutstandingItemsCtrl.$inject = ['TransactionService'];

  angular.module('youomi.dashboard').controller('OutstandingItemsCtrl', OutstandingItemsCtrl);

})();
