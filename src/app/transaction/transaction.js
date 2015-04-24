/**
 * Created by Alfred on 2015-04-19.
 */

(function () {
    'use strict';

  angular.module('youomi.transaction', ['ui.router'])
    .config(configs);

  function configs($stateProvider){
    $stateProvider
      .state('home.transaction', {
        url: 'transaction',
        template: '<ui-view></ui-view>'
      })
      .state('home.transaction.return', {
        url: '/return/:transactionId',
        templateUrl: 'app/transaction/views/complete.html'
      });
  }

  configs.$inject = ['$stateProvider'];

})();
