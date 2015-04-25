/**
 * Created by Alfred on 2015-04-17.
 */

(function () {
    'use strict';

  function DashboardTransactionCtrl(TransactionService) {

    var vm = this;
    vm.create = create;
    vm.init = init;
    vm.transactionType = ['Item', 'Currency'];

    init();

    function init () {
      vm.newTrans = {
        type: vm.transactionType[0],
        value: '',
        owerEmail:'',
        owerName:''
      };
    }

    function create(transaction){
      //todo: validation

      TransactionService
        .create(transaction.type, transaction.value, transaction.owerEmail, transaction.owerName)
        .then(function(){
          init();
        }, function(error){
          console.log(error);
        });
    }
  }

  DashboardTransactionCtrl.$inject = ['TransactionService'];

  angular.module('youomi.dashboard').controller('DashboardTransactionCtrl', DashboardTransactionCtrl);

})();
