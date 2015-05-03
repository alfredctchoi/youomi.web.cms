/**
 * Created by Alfred on 2015-04-19.
 */

(function () {
    'use strict';

  function TransactionCtrl($state, TransactionService){

    var vm = this;
    vm.complete = complete;
    vm.getReminderList = getReminderList;
    vm.showSignUpForm = false;
    vm.states = {
      none: 0,
      loading: 1,
      ok: 2,
      error: 3
    };
    vm.state = vm.states.none;

    init();

    function init(){
      vm.completeId = $state.params.transactionId;
    }

    function getReminderList(guid){
      vm.state = vm.states.loading;
      TransactionService
        .getReminderList(guid)
        .then(function(response){
          vm.state = vm.states.ok;
          vm.showSignUpForm = !response.isUserActive;
          vm.transactions = response.transactions;
        }, function(err){
          vm.state = vm.states.error;
          vm.error = err.message;
        });
    }

    function complete (id){
      TransactionService
        .complete(id)
        .then(function(){
          var i, transaction;
          for (i = 0; transaction = vm.transactions[i]; i++){
            if (transaction.identifier === id){
              vm.transactions.splice(i, 1);
              break;
            }
          }
        }, function(err){
          vm.state = vm.states.error;
          vm.error = err.message;
        });
    }

  }

  TransactionCtrl.$inject = ['$state', 'TransactionService'];

  angular.module('youomi.transaction').controller('TransactionCtrl', TransactionCtrl);

})();
