/**
 * Created by Alfred on 2015-04-17.
 */

(function () {
    'use strict';

  function TransactionCtrl(TransactionService) {

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
    }

    function create(transaction){
      //todo: validation

      TransactionService
        .create(transaction.type, transaction.value, transaction.owerEmail, transaction.owerName)
        .then(function(newTransaction){
          init();
        }, function(error){
          console.log(error);
        });
    }

  }

  TransactionCtrl.$inject = ['TransactionService'];

  angular.module('youomi.dashboard').controller('TransactionCtrl', TransactionCtrl);

})();
