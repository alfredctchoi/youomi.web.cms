/**
 * Created by Alfred on 2015-04-17.
 */

(function () {
  'use strict';

  function DashboardTransactionCtrl(TransactionService, DashboardService) {

    var vm = this;
    vm.create = create;
    vm.init = init;
    vm.searchEmail = searchEmail;
    vm.setOwer = setOwer;
    vm.reset = reset;

    vm.transactionForm = null;
    vm.transactionType = ['Item', 'Currency'];


    init();

    function setOwer(key) {
      var ower = DashboardService.findOwer(key);
      vm.newTrans.owerEmail = ower.email;
      vm.newTrans.owerName = ower.name;
    }

    function searchEmail(email) {
      if (!email) {
        vm.emailMatches = [];
        return;
      }

      if (email.length < 4) {
        vm.emailMatches = [];
        return;
      }

      vm.emailMatches = DashboardService.searchEmail(email);
    }

    function reset(){
      init();
      vm.transactionForm.$setPristine();
    }

    function init() {
      vm.newTrans = {
        type: vm.transactionType[0],
        value: '',
        owerEmail: '',
        owerName: ''
      };
    }

    function create(transaction) {

      if (vm.transactionForm.$invalid){
        return;
      }

      TransactionService
        .create(transaction.type, transaction.value, transaction.owerEmail, transaction.owerName)
        .then(function () {
          init();
          vm.transactionForm.$setPristine();
        }, function (error) {
          console.log(error);
        });
    }
  }

  DashboardTransactionCtrl.$inject = ['TransactionService', 'DashboardService'];

  angular.module('youomi.dashboard').controller('DashboardTransactionCtrl', DashboardTransactionCtrl);

})();
