/**
 * Created by Alfred on 2015-04-19.
 */

(function () {
    'use strict';

  function TransactionCtrl($state, TransactionService){

    var vm = this;
    vm.complete = complete;
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

    function complete (id){
      vm.state = vm.states.loading;
      TransactionService
        .complete(id)
        .then(function(response){
          vm.state = vm.states.ok;
          vm.showSignUpForm = !response.isUserActive;
          vm.transaction = response.transaction;
        }, function(err){
          vm.state = vm.states.error;
          vm.error = err.message;
        });
    }

  }

  TransactionCtrl.$inject = ['$state', 'TransactionService'];

  angular.module('youomi.transaction').controller('TransactionCtrl', TransactionCtrl);

})();
