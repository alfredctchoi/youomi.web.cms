/**
 * Created by Alfred on 2015-04-24.
 */

(function () {
  'use strict';

  function yomTransactionIndicator() {
    return {
      restrict: 'EA',
      scope: {
        status: '@'
      },
      link: function (scope, element) {

        var classes = {
          completed: 'transaction-indicator-completed',
          outstanding: 'transaction-indicator-outstanding'
        };

        function createIndicator() {
          return angular.element('<div class="transaction-indicator"></div>');
        }

        function addCompletedIndicator() {
          var elem = createIndicator();
          elem.addClass(classes.completed);
          element.append(elem);
        }

        function addOutstandingIndicator() {
          var elem = createIndicator();
          elem.addClass(classes.outstanding);
          element.append(elem);
        }

        function removeChildItems() {
          var items = element.children();
          if (items.length === 0) return;

          for (var i = 0, k = items.length; i < k; i++) {
            items[i].remove();
          }
        }

        function init(status) {

          removeChildItems();

          switch (status) {
            case 'Completed':
              addCompletedIndicator();
              break;
            case 'Active':
              addOutstandingIndicator();
              break;
          }
        }

        scope.$watch('status', init);
      }
    }
  }

  yomTransactionIndicator.$inject = [];

  angular.module('youomi.transaction').directive('yomTransactionIndicator', yomTransactionIndicator);

})();
