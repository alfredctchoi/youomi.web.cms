/**
 * Created by Alfred on 2015-04-28.
 */

(function () {
    'use strict';

  function TransactionFactory() {

    function Transaction() {
      this.id = null;
      this.email = null;
      this.lastReminded = null;
      this.name = null;
      this.owerId = null;
      this.transactions = null;
      this.update = null;
      this.canRemind = null;

      for (var p in arguments[0]) {
        if (!arguments[0].hasOwnProperty(p) || !this.hasOwnProperty(p)) continue;
        this[p] = arguments[0][p];
      }
    }

    return Transaction;
  }

  angular.module('youomi.dashboard').service('Transaction', TransactionFactory);

})();
