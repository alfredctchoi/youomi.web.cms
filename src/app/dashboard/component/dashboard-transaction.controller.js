/**
 * Created by Alfred on 2015-04-17.
 */

(function () {
    'use strict';

  function DashboardTransactionCtrl(TransactionService) {

    var vm = this;
    vm.create = create;

    init();

    function init () {
      vm.transactionType = ['Item', 'Currency'];
      vm.newTrans = {
        type: vm.transactionType[0],
        value: '',
        owerEmail:'',
        owerName:''
      };
      vm.showCreate = false;
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
