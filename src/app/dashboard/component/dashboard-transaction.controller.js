/**
 * Created by Alfred on 2015-04-17.
 */

(function () {
  'use strict';

  function DashboardTransactionCtrl(TransactionService, DashboardService, $state) {

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

      if (email.length < 2) {
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
          reset();
          if ($state.current.name === 'dashboard.new-transaction'){
            $state.go('dashboard.home');
          }
        }, function (error) {
          console.log(error);
        });
    }
  }

  DashboardTransactionCtrl.$inject = ['TransactionService', 'DashboardService', '$state'];

  angular.module('youomi.dashboard').controller('DashboardTransactionCtrl', DashboardTransactionCtrl);

})();
