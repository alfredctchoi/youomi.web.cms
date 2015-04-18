/**
 * Created by Alfred on 2015-04-17.
 */

(function () {
    'use strict';

  function OutstandingItemsCtrl(TransactionService){

    var vm = this;
    vm.remind = remind;

    init();

    function init() {
      TransactionService
        .getOutstandingItems()
        .then(function (items) {
          vm.owers = items;
          console.log(vm.owers);
        });
    }

    function remind(userId){
      TransactionService.remindUser(userId).then(function(data){
        console.log(data);
      }, function(error){
        console.log(error);
      });
    }

  }

  OutstandingItemsCtrl.$inject = ['TransactionService'];

  angular.module('youomi.dashboard').controller('OutstandingItemsCtrl', OutstandingItemsCtrl);

})();
